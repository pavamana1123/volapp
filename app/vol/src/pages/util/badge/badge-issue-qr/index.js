import { useCallback, useEffect, useRef, useState } from "react"
import "./index.css"
import Header from "../../../../components/header"
import QRCam from "../../../../components/qrcam"
import moment from "moment"
import API from '../../../../api'
import Icon from "../../../../components/icon"
import clipboardy from "clipboardy"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from "../../../../components/modal"
import Auto from "../../../../components/auto"
import { Spinner } from "../../../../components/spinner"
import Selector from "../../../../components/selector"

const BadgeIssueQR = (props)=>{

    var { data } = props
    var [date, setDate] = useState()
    var [dates, setDates] = useState()
    var [issued, setIssued] = useState()
    var [searchFilter, setSearchFilter] = useState("")
    var [cameraShowHide, setCameraShowHide] = useState()
    var [showManualEntry, setShowManualEntry] = useState(false)
    var [activeRequests, setActiveRequests] = useState(0) 
    var [showDateSelector, setShowDateSelector] = useState(false) 
    var volunteers = useRef()
    
    var totalBadges = useRef(0)
    const tap = useRef(new Audio(`https://cdn.iskconmysore.org/content?path=volapp/tap.mp3`))

    useEffect(()=>{
        if(!data.events){
            return
        }
        
        var ds = data.events.filter(e=>{
            return e.prasadam && moment(e.date).isSameOrAfter(moment(), 'day')
        }).map(e=>{
            return e.date
        })

        setDates(ds)
        var fdates = ds.filter(d=>moment(d).isAfter(moment()))
        var edate
        if(fdates.length){
            edate = fdates[0]
        }else{
            edate = ds[ds.length-1]
        }
        setDate(edate)

        setActiveRequests(p=>p+1)
        new API().call('get-badge-issue', {edate}).then((res)=>{
            setIssued(res)
            setActiveRequests(p=>p-1)
        }).catch((e)=>{
            console.log(e)
        })

        var vmap = {}
        data.volunteers.filter(v=>{
            return v.date==edate && v.service!="" && v.volunteerName!=""
        }).map(v=>{
            vmap[v.volunteerName]=0
        })

        volunteers.current = Object.keys(vmap).sort()
        totalBadges.current = volunteers.current.length

    }, [data])

    useEffect(()=>{
        setActiveRequests(p=>p+1)
        new API().call('get-badge-issue', {edate: date}).then((res)=>{
            setIssued(res)
            setActiveRequests(p=>p-1)
        }).catch((e)=>{
            console.log(e)
        })

        if(data.volunteers){
            var vmap = {}
            data.volunteers.filter(v=>{
                return v.date==date && v.service!="" && v.volunteerName!=""
            }).map(v=>{
                vmap[v.volunteerName]=0
            })

            volunteers.current = Object.keys(vmap).sort()
            totalBadges.current = volunteers.current.length
        }
    }, [date])

    const onScan = useCallback(scanResult=>{

        var url = new URL(scanResult)
        var vname = url.searchParams.get("name")
        var edate = url.searchParams.get("date")

        if(!vname){
            toast.warn("No name found in the badge! Enter manually")
            setShowManualEntry(true)
            return
        }

        setActiveRequests(p=>p+1)
        new API().call('set-badge-issue', {
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            edate,
            vname,
            listedDate: date
        }).then((res)=>{
            setTimeout(()=>{
                setIssued(res)
                tap.current.play()
                setActiveRequests(p=>p-1)
            }, 1000)
        }).catch((e)=>{
            console.log(e)
            setActiveRequests(p=>p-1)
        })
    },[date])

    const handleDelete = useCallback((vname)=>{
        const deleteConfirm = window.confirm(`Do you want to delete this entry of ${vname}?`)

        if (deleteConfirm) {
            setActiveRequests(p=>p+1)
            new API().call('unset-badge-issue', { edate: date, vname }).then((res)=>{
                setIssued(res) 
                tap.current.play()
            }).catch(console.log)
            .finally(()=>{
                setActiveRequests(p=>p-1)
            })
        }else{
            console.log("Deletion canceled")
        }
    }, [date])

    const readOut = useCallback((d)=>{
        return new URL(d).searchParams.get("name") || ""
    })

    const handleCopy = ()=>{
        clipboardy.write(issued.map(i=>{
            return i.vname
        }).join("\n")).then(()=>{
            toast.success('Names copied to clipboard');
        })
    }

    var timer = useRef()

    const handleSearch = (e)=>{
        clearTimeout(timer.current)
        timer.current = setTimeout(()=>{
            setSearchFilter(e.target.value)
        }, 300)
    }

    const manualFilter = (f)=>{
        return volunteers.current.filter(v=>{
            return v.toLowerCase().indexOf(f.toLowerCase())!=-1
        })
    }

    const closeModal = ()=>{
        setShowManualEntry(false)
    }

    const showModal = ()=>{
        setShowManualEntry(true)
    }

    const Drop = (props)=>{
        var { item, value } = props
        return <div className='bi-manual-drop'
            onClick={()=>{
            onScan(value)
            setTimeout(closeModal, 100)
        }}>
            {item}
        </div>
    }

    return (
        <div className="bi-main">
            <Header title={date?
                <div className="bi-header">
                    <span>{`Volunteer Prasadam for `}</span>
                    <span>{moment(date).format("DD MMM 'YY")}</span>
                    <Icon name="arrow-drop-down" color="white" onClick={()=>{
                        setShowDateSelector(true)
                    }}/>
                </div>
            :null} hideOptions/>

            {showDateSelector?<Selector
                display={dates.map(d=>moment(d).format('ddd, DD MMM YYYY'))}
                value={dates}
                onSelect={setDate}
                onClose={()=>{
                    setShowDateSelector(false)
                }}
            />:null}

            <div className="bi-root">
                <QRCam
                    className="bi-cam"
                    size={"100vw"}
                    onResult={onScan}
                    matchPattern={/https:\/\/vol.iskconmysore.org/}
                    onCameraShowHide={setCameraShowHide}
                    readOut={readOut}
                />
            </div>

            {issued?
                <div className={`bi-issued-holder ${!cameraShowHide?"bi-hidden-cam":""}`}>
                    <div className="bi-issue-spin">
                        <div className="bi-issued-label">{`ISSUED BADGES (${issued.length}${totalBadges.current?`/${totalBadges.current}`:""})`}</div>
                        {activeRequests?<Spinner/>:null}
                    </div>

                    {showManualEntry?<Modal title="Manual Entry" className="bi-manual-modal" onClose={closeModal}>
                        <div className="bi-manual-info">Search and click on a volunteer name to add manually</div>
                        <Auto 
                            className="bi-auto"
                            filter={manualFilter}
                            Drop={Drop}
                            placeholder="Start typing volunteer name.."/>
                    </Modal>:null}

                    <div className="bi-issue-util">
                        <input className="bi-issue-search" placeholder="Search..." onChange={handleSearch}/>
                        {date?<Icon className="bi-util-icon" name="person-add" color="#888" onClick={showModal}/>:null}
                        <Icon className="bi-util-icon" name="content-copy" color="#888" onClick={handleCopy}/>
                    </div>

                    <div className="bi-issued-list">{
                        issued.length?issued.filter(i=>{
                            return searchFilter=="" || i.vname.toLowerCase().indexOf(searchFilter.toLowerCase())!=-1
                        }).map(i=>{
                            return <div className="bi-list-item">
                                <div>
                                    <div>{i.vname}</div>
                                    <div className="bi-list-time">{moment(i.date).format("DD MMM YYYY hh:mm A")}</div>
                                </div>
                                <div>
                                    <Icon name="trash" color="#aaa" size="6vw" onClick={()=>{
                                        handleDelete(i.vname)
                                    }}/>
                                </div>
                            </div>
                        }):<div className="bi-empty-list">No badges are issued</div>
                    }</div>
                </div>
            :null}
        </div>
    )
}

export default BadgeIssueQR