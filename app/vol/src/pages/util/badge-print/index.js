import { useEffect, useRef, useState } from "react"
import "./index.css"

const Badge = (props) =>{
    const { name, seva, spoc } = props.details
    const { back } = props
    return (
        <div className="bp-badge">
            <img className="bp-image" src={`../img/${back?"back":"front"}.png`}/>
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

    let serviceNameMap = {}

    const emptyBadge = {
        name: "",
        seva: "",
        spoc: ""
    }

    useEffect(()=>{

        if(!data || !Object.keys(data).length){
            return
        }

        let { volunteers, services } = data
        volunteers = volunteers.filter(v=>{
            return !v.idCardWritten && v.volunteerName && v.volunteerPhone && v.service && v.date=="2023-11-14"
        })

        services = services.filter(s=>{
            return s.date=="2023-11-14"
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

        services.forEach(s => {
            serviceNameMap[s.serviceName]=s.mainService
        })
    
        setBadgeList(Object.keys(volunteersMap).sort().map(v=>{
            return {
                name: v,
                seva: serviceNameMap[volunteersMap[v].service],
                spoc: volunteersMap[v].spoc
            }
        }).concat(new Array(20).fill(emptyBadge)))
    }, [data])

    const PageBreak = <div className="page-break"></div>

    return (
        <div className="bp-page">
            {
                badgeList.shard(10, emptyBadge).interleave(new Array(10).fill(emptyBadge), true).map((s, i)=>{
                    return <div className="bp-grid">
                        {
                            s.map(b=>{
                                return <Badge details={b} key={b.name} back={(i+1)%2==0}/>
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}

export default BadgePrint

