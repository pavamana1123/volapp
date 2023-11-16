import { useEffect, useRef, useState } from "react"
import "./index.css"

const BadgeList = (props)=>{

    var { data } = props
    var [vols, setVols] = useState([])

    var col = useRef({})

    useEffect(()=>{

      if(!data || !data.volunteers){
        return
      }

      var v = data.volunteers.filter(v=>{
        return (v.date=="2023-11-14") && v.volunteerName!="" && v.service!=""
      }).map(v=>{
        col.current[v.volunteerName]=v.idCardCollected
        return v.volunteerName
      }).unique().sort()

      console.log(v)
      setVols(v)

      console.log(v.deskShard(2), v.length)

    }, [data])

    return (
        vols.shard(87).map((vv)=>{
          return (
            <div className="badge-list-root">
                {
                    vv.map((a, i)=>{ 
                      
                      return <div key={a}>{`${col.current[a]?"☑":"☐"} (${a[0]}) ${a.trim()} ${!data.volunteers.filter(x=>{
                        return x.volunteerName==a
                      })[0].idCardWritten?"(⚠️NP)":""}`}</div> 
                    })
                }
            </div>
          )
        })
    )
}

export default BadgeList