import moment from "moment";
import "./index.css"
import { useEffect, useState } from "react";
import _ from "../../../_";

function ServiceList(props){

    const safePageHeight = 1100
    var tableData = []

    const headers = [
        {
            title: "Name".toUpperCase(),
            key: "volunteerName"
        },
        {
            title: "Date".toUpperCase(),
            key: "date"
        },
        {
            title: "Service".toUpperCase(),
            key: "service"
        },
        {
            title: "Service Timings".toUpperCase(),
            key: "timings"
        },
        {
            title: "SPOC".toUpperCase(),
            key: "spoc"
        },
        {
            title: "Co-Ordinator".toUpperCase(),
            key: "coordinator"
        }
    ]

    const getPage = (ev, tableData, headers, rowStart, rowEnd, pg, total)=>{
        return `
            <div class="slpage">
                <div class="sltitle">
                    <div style="font-size: 1.5vw; font-weight: 900">Service List - Sri Krishna Janmashtami (Round 1)</div>
                    <div style="margin-top: .3vw; font-size: 1.1vw; font-weight: 900">24th Aug - Pre-Arrangements • 25th Aug - Janmashtami Day-1 • 26th Aug - Janmashtami Day-2</div>
                </div>
                
                <table class="sltable">
                    <tbody>
                        <thead class="slheader">
                            <tr>
                                ${
                                    headers.map((h, i)=>{
                                        return `<th class="slcellhead slhead-${i+1}">${h.title}</th>`
                                    }).join("\n").trim()
                                }
                            </tr>
                        </thead>
                        ${
                            tableData.slice(rowStart, rowEnd).map(v=>{
                                return `<tr>
                                    ${
                                        v.map((vd, i)=>{
                                            return !vd.hide?`<td class="slcell slcell-${i+1}" rowspan=${vd.span}>${vd.value}</td>`:""
                                        }).join("\n").trim()
                                    }                                
                                </tr>`.trim()
                            }).join("\n").trim()
                        }
                    </tbody>
                </table>
                <div class="page-num">${`Page ${pg+1} of ${total}`}</div>
                <div class="page-break"/>
            </div>
        `.trim()
    }

    useEffect(()=>{
        document.body.classList.add('sl-page')
    }, [])

    var { data } = props

    const urlParams = new URLSearchParams(window.location.search).get("date").trim()
    var dates = urlParams=="*"?["*"]:urlParams.split(" ").map((u)=>{
        return moment(u, "YYYYMMDD").format("YYYY-MM-DD")
    })

    useEffect(()=>{

        if(Object.keys(data).length){

            var ev = data.events.filter(e=>{
                return (dates[0]=="*" || dates.includes(e.date))
            })[0]

            tableData = data.volunteers.filter(v=>{
                return v.volunteerName!="" && v.date!="" && v.service != "" && (dates[0]=="*" || dates.includes(v.date))
            }).sort((v1, v2)=>{
                return v1.serviceStartTime-v2.serviceStartTime
            }).sort((v1, v2)=>{
                return v1.date<v2.date?-1:1
            }).sort((v1, v2)=>{
                return v1.volunteerName<v2.volunteerName?-1:1
            }).map(v=>{
                return headers.map(h=>{
                    return {
                        value: (()=>{
                            switch(h.key) {
                                case "timings":
                                    return v[h.key].toTimingCase()
                                case "date":
                                    return moment(v[h.key]).format("ddd, Do MMM")
                                // case "coordinator":
                                //     return _.preachers[v[h.key]]
                                default:
                                    return v[h.key]
                            } 
                        })(),
                        span: 1,
                        hide: false,
                        index: 1                   
                    }
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

            const slmain = document.getElementsByClassName("slmain")[0]
            var pages = []
            var page = 0
            var rowStart = 0
            var rowEnd = 1
            var end = false
            
            if(slmain){
                while(true){
                    var slmainHeight = slmain.getBoundingClientRect().height
                    while(slmainHeight<safePageHeight){
                        if(rowEnd>tableData.length){
                            end = true
                            break
                        }
                        slmain.innerHTML = getPage(ev, tableData, headers, rowStart, rowEnd)
                        slmainHeight = slmain.getBoundingClientRect().height
                        rowEnd++
                    }

                    // if(!end){
                    //     rowEnd-=2
                    //     if(tableData[rowEnd][0].hide){
                    //         if(tableData[rowEnd][0].index < tableData[rowEnd][0].span){
                    //             while(tableData[rowEnd][0].index!=1){
                    //                 rowEnd--
                    //             }
                    //             rowEnd--
                    //         }
                    //     }else{
                    //         rowEnd--
                    //     }
                    // }
                    rowEnd-=2
                    
                    pages.push([rowStart, rowEnd+1])
                    rowStart = rowEnd+1
                    rowEnd = rowEnd+2

                    if(rowStart>=tableData.length){
                        break
                    }

                    if(rowStart<tableData.length-1 && rowEnd>tableData.length){
                        rowEnd=tableData.length
                    }

                    for(let i=0; i<tableData[rowStart].length; i++){
                        if(tableData[rowStart][i].hide){
                            tableData[rowStart][i].hide = false
                            tableData[rowStart][i].span = tableData[rowStart][i].span-tableData[rowStart][i].index+1
                            tableData[rowStart][i].index = 1

                            for(let j=1; j<tableData[rowStart][i].span; j++){
                                tableData[rowStart+j][i].span=tableData[rowStart][i].span
                                tableData[rowStart+j][i].index=j+1
                            }
                        }
                    }

                    slmain.innerHTML=""
                    page++
                }
            }

            slmain.innerHTML = pages.map((p, i, pp)=>{
                return getPage(ev, tableData, headers, p[0], p[1], i, pp.length)
            }).join("\n")
        }
    }, [data])

    if(!data || !data.volunteers){
        return <div>Loading...</div>
    }

    return (
        <div className="slmain"/>
    )
}

export default ServiceList