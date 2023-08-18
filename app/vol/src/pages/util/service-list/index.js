import moment from "moment";
import "./index.css"
import { useEffect } from "react";

function ServiceList(props){

    useEffect(()=>{
        document.body.classList.add('sl-page')
    }, [])

    var { data } = props
    var { volunteers } = data

    if(!data || !volunteers){
        return <div>No data</div>
    }

    const urlParams = new URLSearchParams(window.location.search);
    var date = moment(urlParams.get('date'), "YYYYMMDD").format("YYYY-MM-DD")

    volunteers = volunteers.filter(v=>{
        return v.volunteerName!="" && v.date!="" && v.service != "" && v.date==date
    }).sort((v1, v2)=>{
        return v1.serviceStartTime-v2.serviceStartTime
    }).sort((v1, v2)=>{
        return v1.volunteerName<v2.volunteerName?-1:1
    }).map(v=>{
        return {
            name: [v.volunteerName, 1],
            service: [v.service, 1],
            timimgs: [v.timings.toTimingCase(), 1],
            coordinator: [v.coordinator, 1],
            spoc: [v.spoc, 1],
        }
    })

    var spanOrigin=0
    const cols = Object.keys(volunteers[0])
    for(let k=0; k<cols.length; k++){
        for(let i=1; i<volunteers.length; i++){
            if(volunteers[i][cols[k]][0]==volunteers[spanOrigin][cols[k]][0]){
                volunteers[spanOrigin][cols[k]][1]=i-spanOrigin+1
                volunteers[i][cols[k]] = null
            }else{
                spanOrigin=i
            }
        }
    }

    return (
        <div className="slmain">
            <table className="sltable">
                {
                    volunteers.map(v=>{
                        return <tr>
                            {v.name && <td className="slcell" rowspan={v.name[1]}>{v.name[0]}</td>}
                            {v.service && <td className="slcell" rowspan={v.service[1]}>{v.service[0]}</td>}
                            {v.timings && <td className="slcell" rowspan={v.timings[1]}>{v.timings[0]}</td>}
                            {v.coordinator && <td className="slcell" rowspan={v.coordinator[1]}>{v.coordinator[0]}</td>}
                            {v.spoc && <td className="slcell" rowspan={v.spoc[1]}>{v.spoc[0]}</td>}
                        </tr>
                    })
                }
            </table>
        </div>
    )
}

export default ServiceList