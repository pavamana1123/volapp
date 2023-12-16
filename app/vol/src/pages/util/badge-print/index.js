import { useEffect, useState } from "react"
import QRCode from 'qrcode.react';
import "./index.css"

const Badge = (props) =>{
    const { name, seva, spoc } = props.details
    const { back } = props

    return (
        <div className="bp-badge" style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/${back?'back':'front'}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '3.75in',
                height: '5in'
            }}>
                <div className="bp-plus-holder">
                    <div className="bp-plus-row-holder">
                        <div className="bp-plus bp-plus-lt"></div>
                        <div className="bp-plus bp-plus-rt"></div>
                    </div>
                    <div className="bp-plus-row-holder">
                        <div className="bp-plus bp-plus-lb"></div>
                        <div className="bp-plus bp-plus-rb"></div>
                    </div>
                </div>

                {!back?
                    <div className="bp-details">
                        <div className="bp-detail">
                            <div className="bp-detail-label">NAME</div>
                            <div className="bp-detail-text">{name}</div>
                        </div>
                        <div className="bp-detail">
                            <div className="bp-detail-label">SEVA</div>
                            <div className="bp-detail-text">{seva}</div>
                        </div>
                        <div className="bp-detail">
                            <div className="bp-detail-label">SPOC</div>
                            <div className="bp-detail-text">{spoc}</div>
                        </div>
                    </div>:
                    <div className="bp-qr">
                        <QRCode
                            value={name?`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(name)}`:`https://vol.iskconmysore.org/vol`}
                            size={230}
                        />
                    </div>
                }

        </div>
    )
}

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
            return !v.idCardPrinted && v.volunteerName && v.volunteerPhone && v.service && v.date=="2023-12-23"
        })

        services = services.filter(s=>{
            return s.date=="2023-12-23"
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

