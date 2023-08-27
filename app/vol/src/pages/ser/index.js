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

function Ser(props) {

  var { data, dates } = props
  var { services, volunteers, events } = data
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
`.trim() 

  var [filter, setFilter] = useState(filters[0])
  var [showSPOCResp, setShowSPOCResp] = useState(false)
  var [showCouponVols, setShowCouponVols] = useState(false)

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

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has("SPOC")){
      var spoc = decodeURIComponent(urlParams.get("SPOC"))
      setFilter("SPOC")
      setFilterValue(spoc)
      setServiceView(true)
    }
  })


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

  return (
    <div>
      <Header title={data.title} hideOptions/>

      {showSPOCResp && <Modal title="Responsibilities of SPOC" onClose={()=>{
        setShowSPOCResp(false)
      }}>
        {spocResps}
      </Modal>}

      {showCouponVols && <Modal title="Prasadam Coupons" onClose={()=>{
        setShowCouponVols(false)
      }}>
        {filterValue=="None"?"Please select an SPOC!":`${serviceView?"Issue":"SPOC should issue"} Prasadam Coupons to following volunteers on ${moment(dates[selDate.current-1]).format("dddd, Do MMM")} and inform them to use this on the next day (${moment(dates[selDate.current]).format("dddd, Do MMM")})
        
${(()=>{

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
    return `${i+1}. ${v}`
  })

  return mainV.join("\n")

})()}`}
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
                var worksheet = utils.aoa_to_sheet(header.concat(volunteers.filter(v=>{
                  return v.date==dates[selDate.current] && v.volunteerName!=""
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
                })))
                utils.book_append_sheet(workbook,worksheet,"Service Details")
                writeFile(workbook, `${filter=="None"||filterValue=="None"?"Service Details":`${filter}-${filterValue}`}-${dates[selDate.current]}.xlsx`);
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
              <div className='spocresplink' onClick={()=>{
                setShowSPOCResp(true)
              }}>Click here to read responsibilities of SPOC</div>
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
                  }).length
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

                              {serviceView && <button className='sv-coup' onClick={()=>{
                                try {
                                  var attendance = JSON.parse(cookie.get(`@${filterValue}`)|| `{}`)
                                  var msg = Object.keys(attendance).filter((a)=>{
                                    return a.startsWith(d) && attendance[a]
                                  }).map((a)=>{
                                    var aparts = a.split(":")
                                    return `${aparts[0]}\t${aparts[2]}`
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
                          return <div className='svHolder'>
                            <Serv service={s} volunteers={volunteers.filter(v=>{return v.date==d && v.volunteerName != ""})}/>
                            <Vols date={d} service={s} filterValue={filterValue} serviceView={serviceView} volunteers={volunteers.sort((v1,v2)=>{
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
