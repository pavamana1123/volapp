import { useEffect, useState } from "react"
import "./index.css"
import Badge from "../badge-card"

const BadgePrint = (props)=>{

    let { data } = props
    let [ badgeList, setBadgeList ] = useState([])

    let serviceNameMap = {}

    const emptyBadge = {
        name: "", seva: "", spoc: ""
    }

    useEffect(()=>{

        if(!data || !Object.keys(data).length){
            return
        }

        let { volunteers, services } = data
        volunteers = volunteers.filter(v=>{
            return !v.idCardPrinted && v.volunteerName && v.volunteerPhone && v.service && v.date=="2024-01-06"
        })

        services = services.filter(s=>{
            return s.date=="2024-01-06"
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
        }))


    }, [data])

    // badgeList = badgeList.concat(new Array(15).fill(emptyBadge))

    let badgeShard = badgeList.shard(10, emptyBadge)

    return (
        <div className="bp-root">

            {
                badgeShard.map((s, i)=>{
                    return [
                        <div className="bp-page" key={`s-${i}`}>
                            <div className="bp-row">
                                {
                                    s.slice(0, s.length/2).map(b=>{
                                        return <Badge details={b}/>
                                    })
                                }
                            </div>
                            <div className="bp-row">
                                {
                                    s.slice(s.length/2, s.length).map(b=>{
                                        return <Badge details={b}/>
                                    })
                                }
                            </div>
                            <div className="page-break"></div>
                        </div>,

                        <div className="bp-page" key={`s-${i}`}>
                            <div className="bp-row">
                                {
                                    s.slice(0, s.length/2).reverse().map(b=>{
                                        return <Badge details={b} back/>
                                    })
                                }
                            </div>
                            <div className="bp-row">
                                {
                                    s.slice(s.length/2, s.length).reverse().map(b=>{
                                        return <Badge details={b} back/>
                                    })
                                }
                            </div>
                            {!(i==badgeShard.length-1)?<div className="page-break"></div>:null}
                        </div>
                    ]
                })
            }

        </div>
    )
}

export default BadgePrint

