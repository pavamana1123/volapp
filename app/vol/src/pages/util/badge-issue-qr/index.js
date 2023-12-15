import { useEffect, useRef, useState } from "react"
import "./index.css"
import Header from "../../../components/header"
import QRCam from "../../../components/qrcam"
import moment from "moment"

const BadgeIssueQR = (props)=>{

    var { data } = props
    var [res, setRes] = useState("")
    var [dates, setDates] = useState([])
    var [date, setDate] = useState([])

    useEffect(()=>{
        if(!data.events){
            return
        }

        var d = data.events.filter(e=>{
            return e.badge && moment(e.date).isSameOrAfter(moment(), 'day')
        }).map(e=>{
            return e.date
        })

        setDates(d)
        setDate(d[0])
    }, [data])

    const onScan = (vname, err)=>{
        
    }

    return (
        <div className="pqr-main">
            <Header title={data.title} hideOptions/>
            <div className="pqr-root">
                <div className="bi-title">
                    <div>{dates.length?`Badge issue for `:"..."}</div>
                    <div className="bi-date">{`${moment(date).format("DD MMM 'YY")}`}</div>
                </div>
                <QRCam className="bi-cam" size={"85vw"} onResult={onScan}/>
            </div>

            <div>{res}</div>
        </div>
    )
}

export default BadgeIssueQR