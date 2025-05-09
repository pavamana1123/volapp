import './index.css';
import Header from "../../components/header"
import { useEffect, useRef, useState } from 'react';
import Tab from '../../components/tab';
import {Spinner} from '../../components/spinner';
import moment from 'moment'
import Serv from './serv';
import Vols from './vols';
import {utils, writeFile} from "xlsx"
import { Paper } from '../../components/paper';
import Modal from '../../components/modal';
import cookie from '../../cookie';
import API from '../../api'

function Ser(props) {

  var { data, dates } = props
  var { services, volunteers, events, slots } = data
  var selDate = useRef(0)
  var selDateValue = useRef(0)

  const filters = [
    "None",
    "Coordinator",
    "SPOC",
    "Service",
    "Volunteer",
    "Category",
    "Preacher"
  ]


  const spocResps = `SPOC should -

1. Meet the coordinator and understand all the details of the service, timings, dress code, etc. from him.

2. Organize a meeting between the coordinator and volunteers wherein the coordinator will discuss the details of the service with the volunteers. The meeting can be held either online or offline well in advance, before the festival. 

3. Make sure that volunteers report at the proper time and in the appropriate dress code for their service.

4. Update attendance of volunteers in your SPOC link by clicking grey color tick symbol against the volunteer name. Symbol turns green to indicate that attendance is marked. By end of the service, click on "Share Attendance" to share attendance data to Volunteer Care Cell over WhatsApp. As much as possible, marking of attendance must be done without the notice of volunteers. 

5. Keep constant touch with the coordinator and update the coordinator about the service status.

7. Ensure that volunteers are rendering service as per the instructions of the coordinator.

6. Collect Prasadam Coupons from Volunteer Care Cell on Sunday, 3rd September 2023, and issue them to volunteers on the previous day of service. Prasadam Coupons are meant to be used only on the 6th and 7th of September. Not on other days. You can find the list of volunteers to whom you must issue the coupons by clicking on "Coupons" button in SPOC link.

7. SPOC should behave politely and patiently with everyone (visitors and volunteers) and should train the volunteers to also behave the same way. No one should loose temper at any point of time.
`.trim() 

  var [filter, setFilter] = useState(filters[0])
  var [showSPOCResp, setShowSPOCResp] = useState(false)
  var [showCouponVols, setShowCouponVols] = useState(false)
  var [unlocked, setUnlocked] = useState(false)

  const onFilterChange = (e)=>{
    setFilter(e.target.value)
  }

  const onFilterValueChange = (e)=>{
    setFilterValue(e.target.value)
  }

  var source = []
  switch(filter){
    case "Coordinator": 
    case "SPOC":
    case "Service":
      source = services
      break
    case "Volunteer":
    case "Category":
    case "Preacher":
      source = volunteers
    default:
  }

  source = source || []

  const filterValues = ["None"].concat(source.map(s=>{
      switch(filter){
        case "Coordinator":
          return s.coordinator
        case "SPOC":
          return s.spoc
        case "Service":
          return s.serviceName
        case "Volunteer":
          return s.volunteerName
        case "Category":
          return s.category
        case "Preacher":
          return s.preacher
        default:
          return null
      }
    }).filter((value, index, self)=>{
      return self.indexOf(value) === index
    }).sort())

  var [filterValue, setFilterValue] = useState(filterValues[0])
  var [serviceView, setServiceView] = useState(false)
  var [reporting, setReporting] = useState({})

  const getReporting = (res)=>{
    var rep = {}
    res.map(r=>{
      if(rep[r.date]){
        if(rep[r.date][r.service]){
          rep[r.date][r.service][r.volunteer]=1
        }else{
          rep[r.date][r.service] = {}
          rep[r.date][r.service][r.volunteer]=1
        }
      }else{
        rep[r.date]={}
        rep[r.date][r.service] = {}
        rep[r.date][r.service][r.volunteer]=1
      }
    })
    return rep
  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search)
    
    if(urlParams.has("SPOC")){
      var spoc = decodeURIComponent(urlParams.get("SPOC"))
      setFilter("SPOC")
      setFilterValue(spoc)
      setServiceView(true)
    }

  }, [])

  let eventMap = {}

  useEffect(()=>{

    if(data.events){
      events.forEach(e=>{
        eventMap[e.date]=e.event
      })
      if(!serviceView && unlockIp && unlockIp.current){
        unlockIp.current.focus()
      }
    }

  }, [data])

  useEffect(()=>{
    if(dates && dates.length){
      new API().call('get-reporting', {dates}).then((res)=>{
          setReporting(getReporting(res))
      }).catch((e)=>{
          console.log(e)
      })
    }
  }, [dates])


  const applyServiceFilters = (s,d)=>{
    return s.filter(s=>{
        return s.date==d && ((filter=="None"||filterValue=="None")?true:(()=>{
          switch(filter){
            case "Coordinator":
              return s.coordinator==filterValue
            case "SPOC":
              return s.spoc==filterValue
            case "Service":
              return s.serviceName==filterValue
            case "Volunteer":
              return volunteers.filter(v=>{
                return v.date==d && v.service==s.serviceName && v.volunteerName==filterValue 
              }).length>0
            case "Category":
              return volunteers.filter(v=>{
                return v.date==d && v.service==s.serviceName && v.category==filterValue 
              }).length>0
            case "Preacher":
              return volunteers.filter(v=>{
                return v.date==d && v.service==s.serviceName && v.preacher==filterValue 
              }).length>0
            default:
              return true
          }                      
      })())
    })
  }

  var unlockIp = useRef()

  const unlock = (e)=>{
    if(e.target.value=="1966"){
      setUnlocked(true)
    }
  }

  return (
    <div>

      {
        (!serviceView && !unlocked)?<div className='ser-lock-bg'>
          <div className='ser-pass-holder'>
            <input ref={unlockIp} type='password' className='ser-pass' placeholder='Passcode' onChange={unlock} pattern="[0-9]*" inputmode="numeric"/>
          </div>
        </div>:null
      }

      <Header title={data.title} hideOptions/>

      {false?showSPOCResp && <Modal title="Responsibilities of SPOC" onClose={()=>{
        setShowSPOCResp(false)
      }}>
        {spocResps}
      </Modal>:null}

      {showCouponVols && <Modal title="Prasadam Coupons" onClose={()=>{
        setShowCouponVols(false)
      }}>
        {filterValue=="None"?"Please select an SPOC!":`${serviceView?"Issue":"SPOC should issue"} Prasadam Coupons to following volunteers:`}
        
        {(()=>{

          var spocVols = volunteers.filter(v=>{
            return v.date==selDateValue.current && v.spoc==filterValue && v.service!="" && v.volunteerName!=""
          })

          var mainSpoc = {}
          spocVols.forEach(v=>{
            mainSpoc[v.volunteerName]=""
          })
          var volList = Object.keys(mainSpoc).sort()

          volList.forEach(v=>{
            mainSpoc[v]=volunteers.filter(vv=>{
              return vv.volunteerName==v && vv.date==selDateValue.current
            }).sort((v1, v2)=>{
              return v2.serviceDuration-v1.serviceDuration
            })[0].spoc
          })

          var mainV = volList.filter(v=>{
            return mainSpoc[v]==filterValue
          }).sort().map((v, i)=>{
            return v
          })

          var b = []
          var l = []
          var d = []

          mainV.forEach(v=>{
            for(let i=0; i<spocVols.length; i++){
              if(spocVols[i].volunteerName==v){
                var av = spocVols[i].availability
                for(let k=0; k<slots.length; k++){
                  if(slots[k].slot==av){
                    if(slots[k].b==1){
                      if(b.indexOf(v)==-1){
                        b.push(v)
                      }
                    }
                    if(slots[k].b==1){
                      if(l.indexOf(v)==-1){
                        l.push(v)
                      }
                    }
                    if(slots[k].d==1){
                      if(d.indexOf(v)==-1){
                        d.push(v)
                      }
                    }
                    break
                  }
                }
                continue
              }
            }
          })

          var tw = `Breakfast:
${b.map((bb, i)=>{
  return `${(i+1).toString().padStart(2, '0')}. ${bb}`
}).join('\n')}

Lunch:
${l.map((bb, i)=>{
  return `${(i+1).toString().padStart(2, '0')}. ${bb}`
}).join('\n')}

Dinner:
${d.map((bb, i)=>{
  return `${(i+1).toString().padStart(2, '0')}. ${bb}`
}).join('\n')}`.trim()

          var nw = mainV.map((vv, i)=>{
            var bld = []
            if(b.indexOf(vv)!=-1){
              bld.push('B')
            }
            if(l.indexOf(vv)!=-1){
              bld.push('L')
            }
            if(d.indexOf(vv)!=-1){
              bld.push('D')
            }

            return `${(i+1).toString().padStart(2,'0')}. ${vv} (${bld.join(', ')})`

          }).join('\n')


          return <Tab tabs={[
            {
              title: 'Name Wise',
              value: 'n',
              component: <div>{nw}</div>
            },
            {
              title: 'Time Wise',
              value: 't',
              component: <div>{tw}</div>
            }
          ]}/>

        })()}

      </Modal>}   

      <div className='pageMainDiv'>
        {services && !serviceView?
          <div className='filterBody'>
              <div className='filterBy'>
                <div className='fillabel'>Filter By</div>
                <select className='filselect'
                  onChange={onFilterChange}>  
                  {
                    filters.map(f=>{
                      return <option value={f} key={f}>{f}</option>
                    })
                  }
                </select>
              </div>

              <div className='filtervalue'>
                <div className='fillabel'>{`Select ${filter=="None"?"":filter}`}</div>
                  <select className='filselect'
                      onChange={onFilterValueChange}
                      disabled={filter=="None"}>
                    {filterValues.map(f=>{
                      return <option>{f}</option>
                    })}
                  </select>
              </div>

              <div onClick={()=>{
                var workbook = utils.book_new()
                var header = [[
                  "Date",
                  "Service",
                  "Service Timings",
                  "Name",
                  "Phone",
                  "Volunteer Availability",
                  "Age",
                  "Category",
                  "Coordinator",
                  "SPOC",
                  "SPOC Phone"
                ]]

                var sheetData = header.concat(volunteers.filter(v=>{
                  return v.date==selDateValue.current && v.volunteerName!=""
                }).sort((a,b)=>{
                  return a.volunteerName>b.volunteerName?1:-1
                }).sort((a,b)=>{
                  return a.service>b.service?1:-1
                }).filter(v=>{
                  if(filter=="None"||filterValue=="None"){
                    return true
                  }
                  switch(filter){
                    case "Coordinator":
                      return v.coordinator==filterValue
                    case "SPOC":
                      return v.spoc==filterValue
                    case "Service":
                      return v.service==filterValue
                    case "Volunteer":
                      return v.volunteerName==filterValue
                    case "Category":
                      return v.category==filterValue
                    case "Preacher":
                      return v.preacher==filterValue
                  }
                }).map(v=>{
                  return [
                    v.date,
                    v.service,
                    v.timings.toTimingCase(),
                    v.volunteerName,
                    v.volunteerPhone,
                    v.availability,
                    v.age,
                    v.category,
                    v.coordinator,
                    v.spoc,
                    v.spocPhone
                  ]
                }))

                var worksheet = utils.aoa_to_sheet(sheetData)

                worksheet["!cols"] = sheetData.maxColWidth().map(w=>{ return {wch: w} })

                utils.book_append_sheet(workbook, worksheet, "Service Details")

                writeFile(workbook, `${filter=="None"||filterValue=="None"?"Service Details":`${filter}-${filterValue}`}-${selDateValue.current}.xlsx`);
              }}>
                <img className="downlaodicon" src="filetype-xls.svg" title="Download XL sheet"/>
              </div>
          </div>:null}
        <div className='ser'>
          {
            serviceView && <div>
              <Paper className="spoc-title">
                <div>SPOC - {filterValue}</div>
              </Paper>
              {null && <div className='spocresplink' onClick={()=>{
                setShowSPOCResp(true)
              }}>Click here to read the responsibilities of SPOC</div>}
            </div>
          }
          {dates.length?
            <Tab onTabChange={(i, value)=>{
                selDate.current=i
                selDateValue.current = value
              }}
              tabs={
                dates.filter(d=>{
                  return !!services.filter(s=>{
                    return s.date==d && (serviceView?s.spoc==filterValue:true)
                  }).length && !events.filter(e=>{
                    return e.date==d
                  })[0].hide
                }).map((d)=>{
                  var dateServices = applyServiceFilters(services.sort((s1,s2)=>{
                    return s1.startTime-s2.startTime
                  }),d)

                  if(!selDateValue.current){
                    selDateValue.current=d
                  }

                  return {
                    title: dates.length==1?moment(d,"YYYY-MM-DD").format("dddd, Do MMMM YYYY"):(dates.length <5 ? moment(d,"YYYY-MM-DD").format("Do MMM"): moment(d,"YYYY-MM-DD").format("MMM D")),
                    value: d,
                    component: dateServices.length?
                      <div className='serServ'>

                        <div className='ser-event-name'>{events.filter(e=>{
                          return e.date==d
                        })[0].event}</div>

                        {dateServices.length && (!serviceView && (serviceView && filter!="SPOC")) && <div className='ser-count'>{`${dateServices.length} service${dateServices.length>1?"s":""}`}</div>}

                        {dateServices.length && (serviceView || filter=="SPOC") && 
                          <div className='sv-info-header'>
                            <div className='sv-count'>{`${dateServices.length} service${dateServices.length>1?"s":""}`}</div>

                            <div>
                              {events.filter(e=>{
                                return e.date==d
                              })[0].coupon && <button className='sv-coup' onClick={(()=>{
                                setShowCouponVols(true)
                              })}>Coupons</button>}

                              {null && serviceView && <button className='sv-coup' onClick={()=>{
                                try {
                                  var attendance = JSON.parse(cookie.get(`@${filterValue}`)|| `{}`)
                                  var msg = Object.keys(attendance).filter((a)=>{
                                    return a.startsWith(d) && attendance[a]
                                  }).map((a)=>{
                                    var aparts = a.split(":")
                                    return `${aparts[0]}\t${aparts[2]}\t${aparts[1]}`
                                  }).join("\n")

                                  var link = `https://wa.me/918123942324?text=${encodeURIComponent(msg)}`
                                  window.open(link, "_blank")

                                }catch{
                                  alert("Unable to share attendance. Please contact volunteer care cell!")
                                }
                              }}>Share Attendance</button>}
                            </div>
                          </div>
                        }

                        {
                          dateServices.map(s=>{
                          return <div className='svHolder' key={s.serviceName}>
                            <Serv service={s} volunteers={volunteers.filter(v=>{return v.date==d && v.volunteerName != ""})}/>
                            <Vols
                              date={d}
                              dates={dates}
                              service={s}
                              filterValue={filterValue}
                              serviceView={serviceView}
                              reporting={reporting}
                              onReportUpdate={(res)=>{
                                setReporting(getReporting(res))
                              }}
                              volunteers={volunteers.sort((v1,v2)=>{
                                if(v1.volunteerName > v2.volunteerName){
                                  return 1
                                }
                                return -1
                              }).filter(v=>{
                              return v.service==s.serviceName && v.date==d && v.volunteerName != "" && (()=>{
                                switch(filter){
                                  case "Volunteer":
                                    return v.volunteerName==filterValue
                                  case "Category":
                                    return v.category==filterValue
                                  case "Preacher":
                                    return v.preacher==filterValue
                                  default:
                                    return true
                                }
                              })()
                            })} />
                          </div>
                        })
                      }</div>
                    :<div className='noservices'>{"No Services"}</div>
                  }
              })
            }/>:<Spinner/>
          }
        </div>  

        <div style={{margin:"15vw"}}/>
      </div>
    </div>
  );
}

export default Ser;
