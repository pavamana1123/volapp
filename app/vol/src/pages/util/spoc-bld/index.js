import { useEffect, useRef, useState } from 'react';
import './index.css';
function SPOCBLD(props) {

  var { data } = props
  var {slots, services, volunteers, events} = data

  var [date, setDate] = useState('')

  useEffect(()=>{

    if(!data || !data.events){
      return
    }

    if(date==""){
      setDate(events.map(e=>{
        return e.date
      }).sort()[0])
    }
  }, [data])

  slots = slots || []
  var bld = {}
  slots.map(s=>{
    bld[s.slot]=bld[s.slot]||{}
    bld[s.slot]["b"]=s.b
    bld[s.slot]["l"]=s.l
    bld[s.slot]["d"]=s.d
  })

  volunteers = (volunteers||[]).filter(v=>{
    return v.date==date && v.volunteerName!=""
  })

  var vl = {}
  volunteers.map(v=>{
    vl[v.volunteerName]=0
  })

  var volunteerNames = Object.keys(vl).sort()

  var majorServices = volunteerNames.map(n=>{
    var ms = volunteers.filter(v=>{
      return v.volunteerName==n
    }).sort((a,b)=>{
      return b.serviceDuration-a.serviceDuration
    })[0]

    return {
      name: n,
      service: ms.service,
      spoc: ms.spoc,
      availability: ms.availability,
      timings: ms.timings
    }
  })

  var spocMap = {}

  majorServices.map(ms=>{
    spocMap[ms.spoc] = spocMap[ms.spoc] || {}
    spocMap[ms.spoc].availability = spocMap[ms.spoc].availability || []
    spocMap[ms.spoc].availability.push(ms.availability=="NOT AVAILABLE"?"All slots":ms.availability)
  })

  var spocs = Object.keys(spocMap).sort()

  const getCount = (spoc, section)=>{
    return spocMap[spoc].availability.map(a=>{
      return bld[a][section]
    }).reduce((a,b)=>{
      return a+b
    })
  }

  var bldCount = spocs.map(s=>{
    return {
      name: s,
      b: getCount(s, "b"),
      l: getCount(s, "l"),
      d: getCount(s, "d")
    }
  })

  return (
    services?<div className='bldroot'>
      {true && <div className='spocdate'>
        Select date
        <input type={"date"} className='spocdateip' defaultValue={date} onChange={(e)=>{
          console.log(e.target.value)
          setDate(e.target.value)
        }}/>
      </div>}
      <div className='spocbld'>
        <div className='countrow'>
          <div className='spochead spocell'>{"#"}</div>
          <div className='spochead spocell spocname'>{`SPOC Name (${bldCount.length})`}</div>
          <div className='spochead spocell spocb'>{`Breakfast (${bldCount.map(p=>{return p.b}).reduce((a,b)=>{return a+b}, 0)})`}</div>
          <div className='spochead spocell spocl'>{`Lunch (${bldCount.map(p=>{return p.l}).reduce((a,b)=>{return a+b}, 0)})`}</div>
          <div className='spochead spocell spocd'>{`Dinner (${bldCount.map(p=>{return p.d}).reduce((a,b)=>{return a+b}, 0)})`}</div>
        </div>
        {
          bldCount.map((s,i)=>{
            return <div className='countrow'>
              <div className='spocell'>{i+1}</div>
              <div className='spocell spocname'>{s.name}</div>
              <div className='spocell spocb'>{s.b}</div>
              <div className='spocell spocl'>{s.l}</div>
              <div className='spocell spocd'>{s.d}</div>
            </div>
          })
        }
      </div>
    </div>:null
  );
}

export default SPOCBLD;
