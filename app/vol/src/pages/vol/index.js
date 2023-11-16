import './index.css';
import Header from "../../components/header"
import { useEffect, useState } from 'react';
import { Paper } from '../../components/paper';
import Tab from '../../components/tab';
import Serv from './serv';
import {Spinner} from '../../components/spinner';
import moment from 'moment'
import Auto  from '../../components/auto';

function Vol(props) {

  var [filter, setFilter] = useState('')
  var [preset, setPreset] = useState('')
  var [volunteerNames, setVolunteerNames] = useState('')
  var { data, dates, showList } = props
  var { volunteers, services, events } = data

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    setFilter(urlParams.get('name'))
    setPreset(!!urlParams.get('name'))
  }, [])

  useEffect(()=>{
    var vn = {}
    volunteers && volunteers.map(v=>{
      if(v.volunteerName!=""){
        vn[v.volunteerName]=0
      }
    })
    setVolunteerNames(Object.keys(vn).sort())
  }, [data])

  const NoServ = <div style={{color:"#333", margin: "5vw", display: "flex", justifyContent: "center"}}>{"No services"}</div>

  const filterFunc = (f)=>{
    return volunteerNames.filter(v=>{
      return v.toLowerCase().includes(f.toLowerCase())
    })
  }

  const Drop = (props)=>{
    var { item, value } = props
    return <div className='volnameauto'
      onClick={()=>{
        setFilter(value)
    }}>
      {item}
    </div>
  }

  return (
    <div>
      <Header title={data.title} hideOptions/>
      <div className='vol'>
        {preset?
          <Paper>{filter}</Paper>
          :
          <Auto inputClass="autoinvol" filter={filterFunc} Drop={Drop}/>
        }
        {filter && dates.length?
          <Paper className="serpaper">
            {!preset && <div className='volnameintab'>{filter}</div>}
            {
              <Tab tabs={
                  dates.filter(d=>{
                    return !!volunteers.filter(v=>{
                      return v.date==d && v.volunteerName==filter && v.service!=""
                    }).length && !events.filter(e=>{
                      return e.date==d
                    })[0].hide
                  }).map((d)=>{

                    var svs1 = volunteers.filter(v=>{
                      return v.volunteerName==filter && v.date==d
                    })

                    const mainService = svs1.sort((s1, s2)=>{
                      return s2.serviceDuration-s1.serviceDuration
                    })[0]

                    var svs = svs1.map((s, i, ss)=>{
                      return <Serv details={s} services={services} i={i} sl={ss.length} mainService={mainService}/>
                    })

                    return {
                      title: dates.length==1?moment(d,"YYYY-MM-DD").format("dddd, Do MMMM YYYY"):(dates.length <5 ? moment(d,"YYYY-MM-DD").format("Do MMM"): moment(d,"YYYY-MM-DD").format("MMM D")),
                      component: svs.length?
                        <div>
                            <div className='event-name'>{`${data.events.filter(e=>{
                              return e.date==d
                            })[0].event} (${svs.length} service${svs.length>1?"s":""})`.trim()}</div>
                            <div className='voldetholderv'>
                                <div style={{width: '100%'}}>{svs}</div>
                                {data.events.filter(e=>{
                                  return e.date==d
                                })[0].coupon && <div className='pracoup'>
                                  <div className='dark'>Collect Prasadam Coupon from</div>
                                      {<div style={{
                                          display: "flex",
                                          alignItems: "center"
                                      }}>
                                          <div className='spocdetholder'>
                                              <div className='detailFeild' style={{marginRight: "2vw"}}>
                                                  <div>{`${mainService.spoc}`}</div>
                                                  <div className='spocdetphone'>{`${mainService.spocPhone}`}</div>
                                              </div>
                                              <div className='spocdeticons'>
                                                  {!isNaN(mainService.spocPhone)?<a href={`tel:+91${mainService.spocPhone}`}><i className="bi bi-telephone-fill spocdeticon"></i></a>:null}
                                                  {!isNaN(mainService.spocPhone)?<a href={`https://wa.me/91${mainService.spocPhone}`} target="_blank"><i className="bi bi-whatsapp spocdeticon"></i></a>:null}
                                              </div>
                                          </div>
                                      </div>}
                                </div>}
                            </div>
                        </div>
                      :NoServ
                    }
                })
              }/>
            }
          </Paper>
        :
        (filter && <Spinner style={{marginTop:"2vw"}} size={2}/>)}
      </div>

      <div style={{margin:"15vw"}}/>
    </div>
  );
}

export default Vol;
