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

  return (
    <div>
      <Header hideOptions/>
      <div className='vol'>
        <Paper>{filter}</Paper>
        {dates.length?<Paper style={{marginTop:"2vw", padding: 0, width: "86vw"}}>{
          <Tab tabs={
              dates.map((d)=>{
              return {
                title: moment(d,"YYYY-MM-DD").format("Do MMMM"),
                component: volunteers.filter(v=>{
                  return v.volunteerName==filter && v.date==d
                }).map(s=>{
                  return <Serv details={s}/>
                })
              }
            })
          }/>
        }</Paper>:<Spinner style={{marginTop:"2vw"}} size={5}/>}
      </div>
    </div>
  );
}

export default Vol;
