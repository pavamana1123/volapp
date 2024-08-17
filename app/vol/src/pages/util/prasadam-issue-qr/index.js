import { useCallback, useEffect, useRef, useState } from "react"
import "./index.css"
import Header from "../../../components/header"
import QRCam from "../../../components/qrcam"
import moment from "moment"
import API from '../../../api'
import Icon from "../../../components/icon"
import Tab from "../../../components/tab"
import clipboardy from "clipboardy"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from "../../../components/modal"
import Auto from "../../../components/auto"
import { Spinner } from "../../../components/spinner"
import Selector from "../../../components/selector"

const PrasadamIssueQR = (props) => {
    var { data } = props
    var [date, setDate] = useState()
    var [dates, setDates] = useState()
    var [issued, setIssued] = useState()
    var [searchFilter, setSearchFilter] = useState("")
    var [cameraShowHide, setCameraShowHide] = useState()
    var [showManualEntry, setShowManualEntry] = useState(false)
    var [activeRequests, setActiveRequests] = useState(0)
    var [showDateSelector, setShowDateSelector] = useState(false)
    var [todIssued, setTodIssued] = useState(false)
    var [tpc, setTpc] = useState(0)
    var volunteers = useRef()

    var totalPrasadamCount = useRef(0)
    const tap = useRef(new Audio(`https://cdn.iskconmysore.org/content?path=volapp/tap.mp3`))
    const warn = useRef(new Audio(`https://cdn.iskconmysore.org/content?path=volapp/warn.mp3`))

    const todLabel = (name) => {
        const currentTime = moment()
        const morningStart = moment('05:00:00', 'HH:mm:ss')
        const morningEnd = moment('11:59:59', 'HH:mm:ss')
        const noonStart = moment('12:00:00', 'HH:mm:ss')
        const afternoonEnd = moment('17:59:59', 'HH:mm:ss')
        const eveningStart = moment('18:00:00', 'HH:mm:ss')
        const nightEnd = moment('23:59:59', 'HH:mm:ss')

        if (currentTime.isBetween(morningStart, morningEnd)) {
            return name ? "Breakfast" : "B"
        } else if (currentTime.isBetween(noonStart, afternoonEnd)) {
            return name ? "Lunch" : "L"
        } else if (currentTime.isBetween(eveningStart, nightEnd)) {
            return name ? "Dinner" : "D"
        } else {
            throw new Error("Invalid time period")
        }
    }

    const todLabelIndex = () => {
        try {
            return ["B", "L", "D"].indexOf(todLabel())
        } catch {
            return 0
        }
    }

    useEffect(() => {
        if (!data.events) {
            return
        }

        var ds = data.events.filter(e => {
            return e.prasadam
        }).map(e => {
            return e.date
        })

        setDates(ds)
        var fdates = ds.filter(d => moment(d).isSameOrAfter(moment(), 'day'))
        var edate
        if (fdates.length) {
            edate = fdates[0]
        } else {
            edate = ds[ds.length - 1]
        }
        setDate(edate)

        setActiveRequests(p => p + 1)
        new API().call('get-prasadam-issue', { edate }).then((res) => {
            setIssued(res)
            setActiveRequests(p => p - 1)
        }).catch((e) => {
            console.log(e)
        })

        volunteers.current = data.volunteers.filter(v => {
            return v.date == edate && v.service != "" && v.volunteerName != ""
        }).map(v => {
            return v.volunteerName
        }).sonique()
        totalPrasadamCount.current = volunteers.current.length

    }, [data])

    useEffect(() => {
        setActiveRequests(p => p + 1)
        new API().call('get-prasadam-issue', { edate: date }).then((res) => {
            setIssued(res)
            setActiveRequests(p => p - 1)
        }).catch((e) => {
            console.log(e)
        })

        if (data.volunteers) {
            var vmap = {}
            data.volunteers.filter(v => {
                return v.date == date && v.service != "" && v.volunteerName != ""
            }).map(v => {
                vmap[v.volunteerName] = 0
            })

            volunteers.current = data.volunteers.filter(v => {
                return v.date == date && v.service != "" && v.volunteerName != ""
            }).map(v => {
                return v.volunteerName
            }).sonique()

            totalPrasadamCount.current = volunteers.current.length
        }
    }, [date])

    const onScan = useCallback((scanResult, notURL) => {

        var vname, edate, edates
        if (notURL) {
            vname = scanResult
            edate = date
            edate = moment().format("YYYY-MM-DD") // temp line
            edates = [edate]
        } else {
            var url = new URL(scanResult)
            vname = url.searchParams.get("name")
            edates = url.searchParams.get("date").split(" ")
            edates = ['2024-08-25', '2024-08-26'] // temp line
            edate = edates[0]
        }

        if (edates.reduce((allOld, edate) => {
            return allOld && moment(edate).isBefore(moment(), 'day')
        }, true)) {
            warn.current.play()
            if (navigator && navigator.vibrate) {
                navigator.vibrate(200)
            }
            toast.error(`Badge issued for older date ${moment(edate).format("Do MMM YYYY")} cannot be accepted!`)
            return
        }

        if (!vname) {
            toast.warn("No name found in the badge! Enter manually")
            setShowManualEntry(true)
            return
        }

        const found = volunteers.current.indexOf(vname) != -1
        if (!found) {
            warn.current.play()
            if (navigator && navigator.vibrate) {
                navigator.vibrate(200)
            }
            toast.error(`This volunteer ${vname} has not been assigned any service!`)
            return
        }

        const repeat = !!todIssued[todLabelIndex()].filter(i => vname == i.vname).length
        if (repeat) {
            warn.current.play()
            if (navigator && navigator.vibrate) {
                navigator.vibrate(200)
            }
            toast.error(`This volunteer ${vname} has already taken ${todLabel(true).toLowerCase()} prasadam!`)
            return
        }

        var tod
        try {
            tod = todLabel()
        } catch (error) {
            toast.error(`Cannot issue prasadam at this time of the day: ${moment().format("hh:mm A")}`)
            return
        }


        setActiveRequests(p => p + 1)
        new API().call('set-prasadam-issue', {
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            edate: moment().format('YYYY-MM-DD'),
            vname,
            tod
        }).then((res) => {
            setTimeout(() => {
                setIssued(res)
                tap.current.play()
                setActiveRequests(p => p - 1)
            }, 1000)
        }).catch((e) => {
            console.log(e)
            setActiveRequests(p => p - 1)
        })
    }, [date, todIssued])

    const handleDelete = useCallback((vname, tod) => {
        const deleteConfirm = window.confirm(`Do you want to delete this entry of ${vname}?`)

        if (deleteConfirm) {
            setActiveRequests(p => p + 1)
            new API().call('unset-prasadam-issue', { edate: date, vname, tod }).then((res) => {
                setIssued(res)
                tap.current.play()
            }).catch(console.log)
                .finally(() => {
                    setActiveRequests(p => p - 1)
                })
        } else {
            console.log("Deletion canceled")
        }
    }, [date])

    useEffect(() => {
        if (!issued) {
            return
        }

        setTodIssued([
            issued.filter(i => i.tod == "B"),
            issued.filter(i => i.tod == "L"),
            issued.filter(i => i.tod == "D"),
        ])

        setTpc(issued.map(i => i.vname).unique().length)

    }, [issued])

    const handleCopy = () => {
        clipboardy.write(issued.map(i => {
            return i.vname
        }).join("\n")).then(() => {
            toast.success('Names copied to clipboard')
        })
    }

    var timer = useRef()

    const handleSearch = (e) => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            setSearchFilter(e.target.value)
        }, 300)
    }

    const manualFilter = (f) => {
        return volunteers.current.filter(v => {
            return v.toLowerCase().indexOf(f.toLowerCase()) != -1
        })
    }

    const closeModal = () => {
        setShowManualEntry(false)
    }

    const showModal = () => {
        setShowManualEntry(true)
    }

    const Drop = (props) => {
        var { item, value } = props
        return <div className='pi-manual-drop'
            onClick={() => {
                onScan(value, true)
                setTimeout(closeModal, 100)
            }}>
            {item}
        </div>
    }

    const readOut = useCallback((d) => {
        return new URL(d).searchParams.get("name") || ""
    }, [])

    return (
        <div className="pi-main">
            <Header title={date ?
                <div className="pi-header">
                    <span>{`Volunteer Prasadam for `}</span>
                    <span>{moment(date).format("DD MMM 'YY")}</span>
                    <Icon name="arrow-drop-down" color="white" onClick={() => {
                        setShowDateSelector(true)
                    }} />
                </div>
                : null} hideOptions />

            {showDateSelector ? <Selector
                display={dates.map(d => moment(d).format('ddd, DD MMM YYYY'))}
                value={dates}
                onSelect={setDate}
                onClose={() => {
                    setShowDateSelector(false)
                }}
            /> : null}

            <div className="pi-root">
                <QRCam
                    className="bi-cam"
                    size={"100vw"}
                    onResult={onScan}
                    matchPattern={/https:\/\/vol.iskconmysore.org/}
                    onCameraShowHide={setCameraShowHide}
                    readOut={readOut}
                />
            </div>

            {issued ?
                <div className={`pi-issued-holder ${!cameraShowHide ? "pi-hidden-cam" : ""}`}>
                    <div className="pi-issue-spin">
                        <div className="pi-issued-label">{`VOLUNTEER PRASADAM (${tpc}${totalPrasadamCount.current ? `/${totalPrasadamCount.current}` : ""})`}</div>
                        {activeRequests ? <Spinner /> : null}
                    </div>

                    {showManualEntry ? <Modal title="Manual Entry" className="pi-manual-modal" onClose={closeModal}>
                        <div className="pi-manual-info">Search and click on a volunteer name to add manually</div>
                        <Auto
                            className="pi-auto"
                            filter={manualFilter}
                            Drop={Drop}
                            placeholder="Start typing volunteer name.." />
                    </Modal> : null}

                    <div className="pi-issue-util">
                        <input className="pi-issue-search" placeholder="Search..." onChange={handleSearch} />
                        {date ? <Icon className="pi-util-icon" name="person-add" color="#888" onClick={showModal} /> : null}
                        {false ? <Icon className="pi-util-icon" name="content-copy" color="#888" onClick={handleCopy} /> : null}
                    </div>
                    {todIssued ? <Tab defaultActive={todLabelIndex()} tabs={
                        todIssued.map((t, i) => {
                            return {
                                title: i == 0 ? `Breakfast (${t.length})` : i == 1 ? `Lunch (${t.length})` : `Dinner (${t.length})`,
                                component: <div className="pi-issued-list">{
                                    t.length ? t.filter(i => {
                                        return searchFilter == "" || i.vname.toLowerCase().indexOf(searchFilter.toLowerCase()) != -1
                                    }).map(i => {
                                        return <div className="pi-list-item">
                                            <div>
                                                <div>{i.vname}</div>
                                                <div className="pi-list-time">{moment(i.date).format("DD MMM YYYY hh:mm A")}</div>
                                            </div>
                                            <div>
                                                <Icon name="trash" color="#aaa" size="6vw" onClick={() => {
                                                    handleDelete(i.vname, i.tod)
                                                }} />
                                            </div>
                                        </div>
                                    }) : <div className="pi-empty-list">Volunteers are yet to honor prasadam</div>
                                }</div>
                            }
                        })
                    } /> : null}
                </div>
                : null}
        </div>
    )
}

export default PrasadamIssueQR