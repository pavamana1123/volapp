import { useEffect, useState } from "react"
import "./index.css"

const BadgeList = (props)=>{

    var { data } = props
    var [vols, setVols] = useState([])

    useEffect(()=>{

      if(!data || !data.volunteers){
        return
      }

      var v = data.volunteers.filter(v=>{
        return (v.date=="2023-09-06" || v.date=="2023-09-07") && v.volunteerName!="" && v.service!=""
      }).map(v=>{
        return v.volunteerName
      }).unique().sort()

      console.log(v)

      setVols(v)

      console.log(v.deskShard(4), v.length)

    }, [data])

    return (
        vols.shard(87).map((vv)=>{
          return (
            <div className="badge-list-root">
                {
                    vv.map((a, i)=>{ return <div key={a}>{`☐ (${a[0]}) ${a.trim()}`}</div> })
                }
            </div>
          )
        })
    )
}

export default BadgeList