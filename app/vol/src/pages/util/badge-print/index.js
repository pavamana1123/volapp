import { useEffect, useRef, useState } from "react"
import "./index.css"

const Badge = (props) =>{
    const { name, seva, spoc } = props.details
    return (
        <div className="bp-badge">
            <img className="bp-image" src="../img/badge.jpeg"/>
            <div className="bp-entry">
                <div className="bp-feild bp-name">{name}</div>
                <div className="bp-feild bp-seva">{seva}</div>
                <div className="bp-feild bp-spoc">{spoc}</div>
            </div>
        </div>
    )
}

const BadgePrint = (props)=>{

    let { data } = props
    let [ badgeList, setBadgeList ] = useState([])

    useEffect(()=>{

        if(!data || !Object.keys(data).length){
            return
        }

        let { volunteers } = data
        volunteers = volunteers.filter(v=>{
            return !v.idCardWritten && v.volunteerName && v.volunteerPhone && v.service && v.date=="2023-11-14"
        })
    
        let volunteersMap = {}
        volunteers.map(v=>{
            if(volunteersMap[v.volunteerName]){
                if(v.serviceDuration>volunteersMap[v.volunteerName].serviceDuration){
                    volunteersMap[v.volunteerName]=v
                }
            }else{
                volunteersMap[v.volunteerName]=v
            }
        })
    
        setBadgeList(Object.keys(volunteersMap).sort().map(v=>{
            return {
                name: v,
                seva: volunteersMap[v].service,
                spoc: volunteersMap[v].spoc
            }
        }))
  
    }, [data])

    const emptyBadge = {
        name: "",
        seva: "",
        spoc: ""
    }

    const PageBreak = <div className="page-break"></div>

    return (
        <div className="bp-page">
            {
                badgeList.shard(5, emptyBadge).map(s=>{
                    return <div className="bp-single">
                        {
                            s.map(b=>{
                                return <Badge details={b} key={b.name}/>
                            })
                        }
                    </div>
                    
                })
            }
        </div>
    )
}

export default BadgePrint

