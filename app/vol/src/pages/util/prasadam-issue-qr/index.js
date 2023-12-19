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
import { Spinner } from "../../../components/spinner"

const PrasadamIssueQR = (props)=>{

    var { data } = props
    var [date, setDate] = useState()
    var [issued, setIssued] = useState()
    var [searchFilter, setSearchFilter] = useState("")
    var [cameraShowHide, setCameraShowHide] = useState()
    var [showManualEntry, setShowManualEntry] = useState(false)
    var [activeRequests, setActiveRequests] = useState(0) 
    var volunteers = useRef()
    
    var totalPrasadamCount = useRef(0)
    const tap = useRef(new Audio(`https://cdn.iskconmysore.org/content?path=volapp/tap.mp3`))

    const getDate = (d)=>{
        return d.events.filter(e=>{
            return e.prasadam && moment(e.date).isSameOrAfter(moment(), 'day')
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
        new API().call('get-prasadam-issue', {edate}).then(setIssued).catch((e)=>{
            console.log(e)
        })

        var vmap = {}
        data.volunteers.filter(v=>{
            return v.date==edate && v.service!="" && v.volunteerName!=""
        }).map(v=>{
            vmap[v.volunteerName]=0
        })

        volunteers.current = Object.keys(vmap).sort()
        totalPrasadamCount.current = volunteers.current.length

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
            const bld = "b"
            setActiveRequests(p=>p+1)
            new API().call('set-prasadam-issue', {
                date: moment().format("YYYY-MM-DD HH:mm:ss"),
                edate,
                vname,
                bld
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
            return edate
        })
    }

    const handleDelete = (vname)=>{
        const deleteConfirm = window.confirm(`Do you want to delete this entry of ${vname}?`)

        if (deleteConfirm) {
            setDate(edate=>{
                setActiveRequests(p=>p+1)
                new API().call('unset-prasadam-issue', { edate, vname }).then((res)=>{
                    setIssued(res) 
                    tap.current.play()
                }).catch(console.log)
                .finally(()=>{
                    setActiveRequests(p=>p-1)
                })
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

    const closeModal = ()=>{
        setShowManualEntry(false)
    }

    const showModal = ()=>{
        setShowManualEntry(true)
    }

    const Drop = (props)=>{
        var { item, value } = props
        return <div className='pi-manual-drop'
            onClick={()=>{
            onScan(value)
            setTimeout(closeModal, 100)
        }}>
            {item}
        </div>
    }

    return (
        <div className="pi-main">
            <Header title={`Volunteer Prasadam for ${moment(date).format("DD MMM 'YY")}`} hideOptions/>
            <div className="pi-root">
                <QRCam className="pi-cam" size={"100vw"} onResult={onScan} debounce onCameraShowHide={setCameraShowHide}/>
            </div>

            {issued?
                <div className={`pi-issued-holder ${!cameraShowHide?"pi-hidden-cam":""}`}>
                    <div className="pi-issue-spin">
                        <div className="pi-issued-label">{`VOLUNTEERS TAKEN PRASADAM (${issued.length}${totalPrasadamCount.current?`/${totalPrasadamCount.current}`:""})`}</div>
                        {activeRequests?<Spinner/>:null}
                    </div>

                    {showManualEntry?<Modal title="Manual Entry" className="pi-manual-modal" onClose={closeModal}>
                        <div className="pi-manual-info">Search and click on a volunteer name to add manually</div>
                        <Auto 
                            className="pi-auto"
                            filter={manualFilter}
                            Drop={Drop}
                            placeholder="Start typing volunteer name.."/>
                    </Modal>:null}

                    {issued.length?<div className="pi-issue-util">
                        <input className="pi-issue-search" placeholder="Search..." onChange={handleSearch}/>
                        {date?<Icon className="pi-util-icon" name="person-add" color="#888" onClick={showModal}/>:null}
                        <Icon className="pi-util-icon" name="content-copy" color="#888" onClick={handleCopy}/>
                    </div>:null}

                    <div className="pi-issued-list">{
                        issued.length?issued.filter(i=>{
                            return searchFilter=="" || i.vname.toLowerCase().indexOf(searchFilter.toLowerCase())!=-1
                        }).map(i=>{
                            return <div className="pi-list-item">
                                <div>
                                    <div>{i.vname}</div>
                                    <div className="pi-list-time">{moment(i.date).format("DD MMM YYYY hh:mm A")}</div>
                                </div>
                                <div>
                                    <Icon name="trash" color="#aaa" size="6vw" onClick={()=>{
                                        handleDelete(i.vname)
                                    }}/>
                                </div>
                            </div>
                        }):<div className="pi-empty-list">Volunteers are yet to honor prasadam</div>
                    }</div>
                </div>
            :null}
        </div>
    )
}

export default PrasadamIssueQR