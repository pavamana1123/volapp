import { useCallback, useEffect, useRef, useState } from "react"
import "./index.css"
import Header from "../../../components/header"
import QRCam from "../../../components/qrcam"
import moment from "moment"
import API from '../../../api';
import Icon from "../../../components/icon"

const BadgeIssueQR = (props)=>{

    var { data } = props
    var [date, setDate] = useState()
    var [issued, setIssued] = useState()

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
            }).then(setIssued).catch((e)=>{
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
                }).catch(console.log)
                return edate
            })
        }else{
            console.log("Deletion canceled")
        }
    }

    return (
        <div className="pqr-main">
            <Header title={`Badge issue for ${moment(date).format("DD MMM 'YY")}`} hideOptions/>
            <div className="pqr-root">
                <QRCam className="bi-cam" size={"100vw"} onResult={onScan} debounce/>
            </div>

            {issued?
                <div className="bi-issued-holder">
                    <div className="bi-issued-label">ISSUED BADGES</div>
                    <div className="bi-issued-list">{
                        issued.length?issued.map(i=>{
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