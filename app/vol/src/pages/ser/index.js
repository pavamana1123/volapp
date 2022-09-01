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

  useEffect(()=>{

  })

  return (
    <div>
      <Header title={data.title} hideOptions/>
      {/* <AutoIn/> */}
      <div className='ser'>
      {dates.length?
        <Tab tabs={
            dates.map((d)=>{
            return {
              title: dates.length==1?moment(d,"YYYY-MM-DD").format("dddd, Do MMMM YYYY"):moment(d,"YYYY-MM-DD").format("Do MMM"),
              component: <div className='serServ'>
                {
                  services.filter(s=>{
                  return s.date==d
                }).map(s=>{
                  return <div className='svHolder'>
                    <Serv service={s}/>
                    <Vols volunteers={volunteers.filter(v=>{
                      return v.service==s.serviceName && v.date==d
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
