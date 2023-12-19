import { useCallback, useEffect, useRef, useState } from "react"
import "./index.css"
import Header from "../../../components/header"
import QRCam from "../../../components/qrcam"
import moment from "moment"
import API from '../../../api'
import Icon from "../../../components/icon"
import clipboardy from "clipboardy"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from "../../../components/modal"
import Auto from "../../../components/auto"

const BadgeIssueQR = (props)=>{

    var { data } = props
    var [date, setDate] = useState()
    var [issued, setIssued] = useState()
    var [searchFilter, setSearchFilter] = useState("")
    var [cameraShowHide, setCameraShowHide] = useState()
    var [showManualEntry, setShowManualEntry] = useState(true)
    var volunteers = useRef()
    
    var totalBadges = useRef(0)
    const tap = useRef(new Audio(`https://cdn.iskconmysore.org/content?path=volapp/tap.mp3`))

    const getDate = (d)=>{
        return d.events.filter(e=>{
            return e.badge && moment(e.date).isSameOrAfter(moment(), 'day')
        }).map(e=>{
            return e.date
        })[0]
    }

    useEffect(()=>{
        if(!data.events){
            return
        }
        var edate = getDate(data)
        setDate(edate)
        new API().call('get-badge-issue', {edate}).then(setIssued).catch((e)=>{
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


    const onScan = (vname, err)=>{

        if(err){
            console.log("Invalid URL")
            return
        }

        if(!vname){
            console.log("Empty name!")
            return
        }

        setDate((edate)=>{
            new API().call('set-badge-issue', {
                date: moment().format("YYYY-MM-DD HH:mm:ss"),
                edate,
                vname
            }).then((res)=>{
                setTimeout(()=>{
                    setIssued(res)
                    tap.current.play()
                }, 1000)
            }).catch((e)=>{
                console.log(e)
            })
            return edate
        })
    }

    const handleDelete = (vname)=>{
        const deleteConfirm = window.confirm(`Do you want to delete this entry of ${vname}?`)

        if (deleteConfirm) {
            setDate(edate=>{
                new API().call('unset-badge-issue', { edate, vname }).then((res)=>{
                    setIssued(res)
                    tap.current.play()
                }).catch(console.log)
                return edate
            })
        }else{
            console.log("Deletion canceled")
        }
    }

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

    const Drop = (props)=>{
        var { item, value } = props
        return <div className='bi-manual-drop'
            onClick={()=>{
            // setFilter(value)
        }}>
            {item}
        </div>
    }

    return (
        <div className="bi-main">
            <Header title={`Badge issue for ${moment(date).format("DD MMM 'YY")}`} hideOptions/>
            <div className="bi-root">
                <QRCam className="bi-cam" size={"100vw"} onResult={onScan} debounce onCameraShowHide={setCameraShowHide}/>
            </div>

            {issued?
                <div className={`bi-issued-holder ${!cameraShowHide?"bi-hidden-cam":""}`}>
                    <div className="bi-issued-label">{`ISSUED BADGES (${issued.length}${totalBadges.current?`/${totalBadges.current}`:""})`}</div>

                    {showManualEntry?<Modal title="Manual Entry" className="bi-manual-modal">
                        <div>Search and click on a volunteer name to add it manually</div>
                        <Auto 
                            className="bi-auto"
                            filter={manualFilter}
                            Drop={Drop}
                            placeholder="Start typing volunteer name.."/>
                    </Modal>:null}

                    <div className="bi-issue-util">
                        <input className="bi-issue-search" placeholder="Search..." onChange={handleSearch}/>
                        {date?<Icon className="bi-util-icon" name="person-add" color="#888"/>:null}
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