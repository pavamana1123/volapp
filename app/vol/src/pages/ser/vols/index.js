import HSep from '../../../components/HSep';
import { Paper } from '../../../components/paper';
import './index.css';

function Vols(props) {

  var { volunteers, serviceView } = props

  return (
    <div className='volsIndiv'>
      <Paper className="ser-vol">
        
          <div className='voldetholder'>{
          volunteers.length?
            volunteers.map(v=>{
              return v.volunteerName?<div className='eachVol'>
                <div className='eachVolDet'>
                  <div className='nameHolder'>
                    {v.reported?<div>
                      <i className="bi bi-check-circle-fill nameCheck"></i>
                    </div>:null}
                    <div>
                      <div>{v.volunteerName}</div>
                      <div className="servol_category">{`${v.category} ${v.preacher && !serviceView?`(${v.preacher})`:""}`}</div>
                    </div>
                  </div>
                    <div className='volactbuttons'>
                    {!isNaN(v.volunteerPhone)?<a href={`tel:+91${v.volunteerPhone}`}><i className="bi bi-telephone-fill"></i></a>:null }
                    {!isNaN(v.volunteerPhone)?<a href={`https://wa.me/91${v.volunteerPhone}`} target="_blank"><i className="bi bi-whatsapp"></i></a>:null}
                    {!isNaN(v.volunteerPhone)?<a href={`https://wa.me/91${v.volunteerPhone}?text=${encodeURI(`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.volunteerName)}`)}`} target="_blank"><i className="bi bi-share-fill"></i></a>:null}
                    <a href={`/vol?name=${encodeURI(v.volunteerName)}`}><i className="bi bi-box-arrow-up-right"></i></a>
                  </div>
                </div>
                <div className="servol_category redlight">{v.availability=="NOT AVAILABLE"?"⚠️ Not available or not filled the form":null}</div>
                {
                  (()=>{
                    if(v.availability=="All slots" || v.availability=="NOT AVAILABLE"){
                      return null
                    }
                    return (()=>{
                          const timeregex = /(\d{1,2}|(\d{1,2}\.\d{1,2}))(\s+)(A|P)M(\s+)-(\s+)(\d{1,2}|(\d{1,2}\.\d{1,2}))(\s+)(A|P)M/
                          var isTimeParseable = !!v.availability.trim().match(timeregex) && !!v.timings.trim().match(timeregex)

                          return <div>
                            {isTimeParseable?(()=>{
                              const set = (s)=>{
                                var ps = s.split("-")
                                var p1 = ps[0].trim()
                                var p2 = ps[1].trim()

                                var ts1 = p1.split(" ")
                                var ts2 = p2.split(" ")

                                var t1 = parseFloat(ts1[0].trim())
                                var t2 = parseFloat(ts2[0].trim())

                                t1+=ts1[1].trim()=="PM"?12:0
                                t2+=ts2[1].trim()=="PM"?12:0

                                return [t1,t2]
                              }
                              const matchTime = (t,a)=>{
                                  return a[0]<=t[0] && a[1]>=t[1]
                              }
                              return matchTime(set(v.timings),set(v.availability))?null:<div>
                                <div className='availRed'><b>{"Avialability "}</b>{`${v.availability} (mismatch)`}</div>
                            </div>
                          })():<div className='availRed'><b>{"Avialability "}</b>{`${v.availability} (not verified)`}</div>
                            }
                            </div>
                        })()
                      
                    
                  })()
                }
                <HSep/>
              </div>:null
            })
            :"No volunteers"
        }
        </div>
      </Paper>
    </div>

  );
}

export default Vols;
