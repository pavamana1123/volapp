import './index.css';
import Header from "../../components/header"
import { useEffect, useState } from 'react';
import { Paper } from '../../components/paper';
import Tab from '../../components/tab';
import {Spinner} from '../../components/spinner';
import moment from 'moment'
import Serv from './serv';
import Vols from './vols';
import { AutoIn } from '../../components/autoin';

function Ser(props) {

  var { data, dates } = props
  var { services, volunteers } = data

  return (
    <div>
      <Header title={data.title} hideOptions/>
      {/* <AutoIn/> */}
      <div className='ser'>
      {dates.length?
        <Tab tabs={
            dates.map((d)=>{
            return {
              title: dates.length==1?moment(d,"YYYY-MM-DD").format("dddd, Do MMMM YYYY"):(dates.length <5 ? moment(d,"YYYY-MM-DD").format("Do MMM"): moment(d,"YYYY-MM-DD").format("MMM D")),
              component: <div className='serServ'>
                {
                  services.sort((s1,s2)=>{
                    if(s1.serviceName > s2.serviceName){
                      return 1
                    }
                    return -1
                  }).filter(s=>{
                  return s.date==d
                }).map(s=>{

                  return <div className='svHolder'>
                    <Serv service={s} volunteers={volunteers.filter(v=>{return v.date==d && v.volunteerName != ""})}/>
                    <Vols volunteers={volunteers.sort((v1,v2)=>{
                        if(v1.volunteerName > v2.volunteerName){
                          return 1
                        }
                        return -1
                      }).filter(v=>{
                      return v.service==s.serviceName && v.date==d && v.volunteerName != ""
                    })} />
                  </div>
                })
              }</div>
            }
          })
        }/>:<Spinner size={3}/>
      }

      </div>  

      <div style={{margin:"15vw"}}/>
    </div>
  );
}

export default Ser;
