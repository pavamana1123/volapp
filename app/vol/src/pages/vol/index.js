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
              dates.map((d)=>{

              var svs = volunteers.filter(v=>{
                return v.volunteerName==filter && v.date==d
              }).map(s=>{
                return <Serv details={s}/>
              })

              return {
                title: dates.length==1?moment(d,"YYYY-MM-DD").format("dddd, Do MMMM YYYY"):(dates.length <5 ? moment(d,"YYYY-MM-DD").format("Do MMM"): moment(d,"YYYY-MM-DD").format("MMM D")),
                component: svs.length?svs:NoServ
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
