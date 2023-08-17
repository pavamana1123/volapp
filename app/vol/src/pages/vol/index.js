import './index.css';
import Header from "../../components/header"
import { useEffect, useState } from 'react';
import { Paper } from '../../components/paper';
import Tab from '../../components/tab';
import Serv from './serv';
import {Spinner} from '../../components/spinner';
import moment from 'moment'
import { AutoIn } from '../../components/autoin';

function Vol(props) {

  var [filter, setFilter] = useState('')
  var { data, dates, showList } = props
  var { volunteers } = data

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    setFilter(urlParams.get('name'))
  })

  const NoServ = <div style={{color:"#333", margin: "5vw", display: "flex", justifyContent: "center"}}>{"No services"}</div>

  return (
    <div>
      <Header title={data.title} hideOptions/>
      <div className='vol'>
        <Paper>{filter}</Paper>
        {dates.length?<Paper className="serpaper">{
          <Tab tabs={
              dates.filter(d=>{
                return !!volunteers.filter(v=>{
                  return v.date==d && v.volunteerName==filter && v.service!=""
                }).length
              }).map((d)=>{

                var svs1 = volunteers.filter(v=>{
                  return v.volunteerName==filter && v.date==d
                })

                const mainService = svs1.sort((s1, s2)=>{
                  return s2.serviceDuration-s1.serviceDuration
                })[0]

                var svs = svs1.map((s, i, ss)=>{
                  return <Serv details={s} i={i} mainService={mainService}/>
                })

                return {
                  title: dates.length==1?moment(d,"YYYY-MM-DD").format("dddd, Do MMMM YYYY"):(dates.length <5 ? moment(d,"YYYY-MM-DD").format("Do MMM"): moment(d,"YYYY-MM-DD").format("MMM D")),
                  component: svs.length?
                    <div>
                        <div className='event-name'>{`${data.events.filter(e=>{
                          return e.date==d
                        })[0].event} (${svs.length} services)`}</div>
                        <div className='voldetholderv'>
                            <div style={{width: '100%'}}>{svs}</div>
                            <div className='pracoup'>
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
                              </div>
                            </div>
                    </div>
                  :NoServ
                }
            })
          }/>
        }</Paper>:<Spinner style={{marginTop:"2vw"}} size={2}/>}
      </div>

      <div style={{margin:"15vw"}}/>
    </div>
  );
}

export default Vol;
