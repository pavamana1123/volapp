import { useEffect, useRef, useState } from 'react';
import './index.css';
import moment from 'moment';
function SPOCBLDLabel(props) {

  var { data } = props
  var {slots, services, volunteers, events} = data

  var [date, setDate] = useState('')
  var [dinnerCount, setDinnerCount] = useState(false)

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    setDate(urlParams.get('date'))
  })

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
    spocMap[ms.spoc].availability.push((ms.availability=="" || ms.availability=="Default")?"Whole Day":ms.availability)
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

    var x = Math.ceil(0.25 * c)
    if(x==0){
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
      d: dinnerCount?getCount(s, "d"): date=="2023-09-07"?0:getCount(s, "d")
    }
  })


  return (
    services?<div className='colabel-bldroot'>

      <div className='colabel-Label'>
        {
          bldCount.map((s,i)=>{
            return <div className='colabel-countrow'>
              <table className='colabel-cotable'>
                <tbody>
                  <tr>
                    <td className='colabel-cocell' colSpan={3}>{s.name}</td>
                  </tr>
                  <tr>
                    <td className='colabel-cocell' colSpan={3}>{moment(date).format('ddd, Do MMM')}</td>
                  </tr>
                  <tr>
                    <td className='colabel-cocell'>{`B - ${s.b}`}</td>
                    <td className='colabel-cocell'>{`L - ${s.l}`}</td>
                    <td className='colabel-cocell'>{`D - ${s.d}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          })
        }
      </div>
    </div>:null
  );
}

export default SPOCBLDLabel;
