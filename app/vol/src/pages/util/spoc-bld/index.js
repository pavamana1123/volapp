import { useEffect, useRef, useState } from 'react';
import './index.css';
function SPOCBLD(props) {

  var { data } = props
  var {slots, services, volunteers, events} = data

  var [date, setDate] = useState('')
  var [dinnerCount, setDinnerCount] = useState(false)
  var [extraCoupons, setExtraCoupons] = useState(true)

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
      phone: ms.spocPhone,
      availability: ms.availability,
      timings: ms.timings
    }
  })

  var spocMap = {}

  majorServices.map(ms=>{
    spocMap[ms.spoc] = spocMap[ms.spoc] || {}
    spocMap[ms.spoc].phone = ms.phone
    spocMap[ms.spoc].availability = spocMap[ms.spoc].availability || []
    spocMap[ms.spoc].availability.push((ms.availability=="" || ms.availability=="Default")?"All Slots":ms.availability)
  })

  var spocs = Object.keys(spocMap).sort()

  const getCount = (spoc, section)=>{
    var c = spocMap[spoc].availability.map(a=>{
      return bld[a][section]
    }).reduce((a,b)=>{
      return a+b
    })

    if(c==0){
      c=2
    }

    var x = Math.ceil((extraCoupons?0.25:0) * c)
    if(x==0 && extraCoupons){
      x=1
    }

    return c+x
  }


  var bldCount = spocs.map(s=>{
    var x = 0
    
    return {
      name: s,
      phone: spocMap[s].phone,
      b: getCount(s, "b"),
      l: getCount(s, "l"),
      d: dinnerCount?getCount(s, "d"): 0
    }
  })


  return (
    services?<div className='bldroot'>

      <div className='iph'>
        <div className='spocdate'>
          Select date
          <input type={"date"} className='spocdateip' defaultValue={date} onChange={(e)=>{
            setDate(e.target.value)
          }}/>
        </div>

        <div>
          <input type='checkbox' onChange={(e)=>{
            setDinnerCount(e.target.checked)
          }}/>
          Include dinner count
        </div>

        <div>
          <input type='checkbox' onChange={(e)=>{
            setExtraCoupons(!e.target.checked)
          }}/>
          Exclude 25% extra count
        </div>

      </div>

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
              <div className='spocell spocname'><a href={`tel:+91${s.phone}`}>{s.name}</a></div>
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
