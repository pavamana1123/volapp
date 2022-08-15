import './index.css';
import Header from "../../components/header"
import { useEffect, useState } from 'react';
import { Paper } from '../../components/paper';
import Tab from '../../components/tab';
import Serv from './serv';
import {Spinner} from '../../components/spinner';
import moment from 'moment'

function Vol(props) {

  var [filter, setFilter] = useState('')
  var { data, dates } = props
  var { volunteers } = data

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    setFilter(urlParams.get('name'))
  })

  const NoServ = <div style={{color:"#333", margin: "5vw", display: "flex", justifyContent: "center"}}>{"No services"}</div>

  return (
    <div>
      <Header hideOptions/>
      <div className='vol'>
        <Paper>{filter}</Paper>
        {dates.length?<Paper style={{marginTop:"2vw", padding: 0, width: "86vw"}}>{
          <Tab tabs={
              dates.map((d)=>{

              var svs = volunteers.filter(v=>{
                return v.volunteerName==filter && v.date==d
              }).map(s=>{
                return <Serv details={s}/>
              })

              return {
                title: moment(d,"YYYY-MM-DD").format("Do MMM"),
                component: svs.length?svs:NoServ
              }
            })
          }/>
        }</Paper>:<Spinner style={{marginTop:"2vw"}} size={5}/>}
      </div>

      <div style={{margin:"15vw"}}/>
    </div>
  );
}

export default Vol;
