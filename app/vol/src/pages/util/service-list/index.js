import moment from "moment";
import "./index.css"
import { useEffect, useState } from "react";

function ServiceList(props){

    const safePageHeight = 1800
    var [ pageReady, setPageReady ] = useState(false)
    var [ tableData, setTableData ] = useState([])
    var [ event, setEvent ] = useState()
    var [ breakPoint, setBreakPoint ] = useState()

    const headers = [
        {
            title: "Name",
            key: "volunteerName"
        },
        {
            title: "Service",
            key: "service"
        },
        {
            title: "Timings",
            key: "timings"
        },
        {
            title: "Co-Ordinator",
            key: "coordinator"
        },
        {
            title: "SPOC",
            key: "spoc"
        }
    ]

    const getPage = (ev, tableData, headers, rowStart, rowEnd)=>{
        return `
            <div class="slpage">
                <div class="sltitle">${ev.tentative?"Tentative":""} Service List - ${ev.event} (${moment(date, "YYYY-MM-DD").format('Do MMM YYYY')})</div>
                <table class="sltable">
                    <tbody>
                        <thead>
                            <tr>
                                ${
                                    headers.map(h=>{
                                        return `<th class="slcellhead">${h.title}</th>`
                                    }).join("\n").trim()
                                }
                            </tr>
                        </thead>
                        ${
                            tableData.slice(rowStart, rowEnd).map(v=>{
                                return `<tr>
                                    ${
                                        v.map(vd=>{
                                            return !vd.hide?`<td class="slcell" rowspan=${vd.span}>${vd.value}</td>`:""
                                        }).join("\n").trim()
                                    }                                
                                </tr>`.trim()
                            }).join("\n").trim()
                        }
                    </tbody>
                </table>
                <div class="page-break"/>
            </div>
        `.trim()
    }

    useEffect(()=>{
        document.body.classList.add('sl-page')
    }, [])

    var { data } = props

    const urlParams = new URLSearchParams(window.location.search);
    var date = moment(urlParams.get('date'), "YYYYMMDD").format("YYYY-MM-DD")

    useEffect(()=>{

        if(Object.keys(data).length){

            var ev = data.events.filter(e=>{
                return e.date==date
            })[0]

            setEvent(ev)
        
            tableData = data.volunteers.filter(v=>{
                return v.volunteerName!="" && v.date!="" && v.service != "" && v.date==date
            }).sort((v1, v2)=>{
                return v1.serviceStartTime-v2.serviceStartTime
            }).sort((v1, v2)=>{
                return v1.volunteerName<v2.volunteerName?-1:1
            }).map(v=>{
                return headers.map(h=>{
                    return {
                        value: h.key=="timings"?v[h.key].toTimingCase():v[h.key],
                        span: 1,
                        hide: false,
                        index: 0                    }
                })
            })
        
            for(let k=0; k<headers.length; k++){
                var spanOrigin=0
                for(let i=1; i<tableData.length; i++){
                    if(tableData[i][k].value==tableData[spanOrigin][k].value){
                        tableData[spanOrigin][k].span=i-spanOrigin+1
                        for(let j=spanOrigin+1; j<=i; j++){
                            tableData[j][k].span = i-spanOrigin+1
                        }
                        tableData[i][k].index=i-spanOrigin+1
                        tableData[i][k].hide = true
                    }else{
                        spanOrigin=i
                    }
                }
            }

            console.log(tableData)

            setTableData(tableData)

            const slmain = document.getElementsByClassName("slmain")[0]
            var pages = []

            var rowStart = 0
            var rowEnd = 1
            while(rowEnd<tableData.length-1){
                if(slmain){
                    var slmainHeight = slmain.getBoundingClientRect().height
                    while(slmainHeight<safePageHeight && rowEnd<tableData.length-1){
                        slmain.innerHTML = getPage(ev, tableData, headers, rowStart, rowEnd)
                        slmainHeight = slmain.getBoundingClientRect().height
                        rowEnd++
                    }
                    rowEnd-=2
                    if(tableData[rowEnd][0].hide){
                        if(tableData[rowEnd][0].index < tableData[rowEnd][0].span){
                            while(tableData[rowEnd][0].index!=0){
                                rowEnd--
                            }
                        }
                    }

                    pages.push(getPage(ev, tableData, headers, rowStart, rowEnd+1))
                    rowStart = rowEnd+1
                    rowEnd = rowEnd+2
                    slmain.innerHTML=""
                }
            }
            slmain.innerHTML = pages.join("\n")
        }


    }, [data])

    if(!data || !data.volunteers){
        return <div>No data</div>
    }

    return (
        <div className="slmain">
            {false?<div className="slpage">
                <div className="sltitle">{`${event.tentative?"Tentative":""} Service List - ${event.event} (${moment(date, "YYYY-MM-DD").format('Do MMM YYYY')})`}</div>
                {pageReady && <table className="sltable">
                    <tbody>
                        {
                            tableData.slice(0, breakPoint).map(v=>{
                                return <tr>
                                    {
                                        v.map(vd=>{
                                            return !vd.hide?<td className="slcell" rowSpan={vd.span}>{vd.value}</td>:null
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </table>}
            </div>:null}
        </div>
    )
}

export default ServiceList