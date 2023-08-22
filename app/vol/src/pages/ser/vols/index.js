import HSep from '../../../components/HSep';
import { Paper } from '../../../components/paper';
import './index.css';
import moment from 'moment';

function Vols(props) {

  var { volunteers, serviceView } = props

  function getTimeCode(d, st, av) {
    const stStart = moment(`${d} ${st.split(' - ')[0]}`, 'YYYY-MM-DD h A')
    const stEnd = moment(`${d} ${st.split(' - ')[1]}`, 'YYYY-MM-DD h A')
    if(stEnd.isBefore(stStart)) stEnd.add(1, "d")

    const avStart = moment(`${d} ${av.split(' - ')[0]}`, 'YYYY-MM-DD h A')
    const avEnd = moment(`${d} ${av.split(' - ')[1]}`, 'YYYY-MM-DD h A')
    if(avEnd.isBefore(avStart)) avEnd.add(1, "d")


    if (!stStart.isValid() || !stEnd.isValid() || !avStart.isValid() || !avEnd.isValid()) return 'U';
    if ((stStart.isSame(avStart) && stEnd.isSame(avEnd)) || (stStart.isSame(avStart) && stEnd.isBefore(avEnd)) || stStart.isAfter(avStart) && stEnd.isSame(avEnd) || stStart.isAfter(avStart) && stEnd.isBefore(avEnd)) return 'OK';
    if (stStart.isSame(avStart) && stEnd.isAfter(avEnd) || (stStart.isBefore(avStart) && stEnd.isAfter(avEnd)) || (stStart.isBefore(avStart) && stEnd.isSame(avEnd)) ) return 'B';
    if (stEnd.isAfter(avEnd)) return 'E';
    if (stStart.isBefore(avStart)) return 'S';
    if ((avStart.isAfter(stEnd) || avEnd.isBefore(stStart) || avEnd.isSame(stStart) || stEnd.isSame(avStart))) return 'M';
    return 'U';
  }

  const getAvComment = (v)=>{

    if(v.timings.toTimingCase().includes("and") || v.availability.includes(",")){
      return `Availability could not verified. Please check with the volunteer (Availability: ${v.availability})`
    }

    switch(v.availability){
      case "All slots":
        return ""
      case "NOT AVAILABLE":
        return "Volunteer may not be available for this service. Please check with the volunteer"
      case "Default":
        return "Availability is assumed by default. Please verify with the volunteer"
    }

    var timeCode = getTimeCode(v.date, v.timings.toTimingCase(), v.availability)
    switch(timeCode){
      case "S":
        return `Volunteer may report late (Availability: ${v.availability})`
      case "E":
        return `Volunteer may leave early (Availability: ${v.availability})`
      case "B":
        return `Volunteer may be available only for sometime (Availability: ${v.availability})`
      case "M":
        return `Complete mismacth in timings (Availability: ${v.availability})`
      case "OK":
        return ``
      default:
        return `Availability could not verified. Please check with the volunteer (Availability: ${v.availability})`
    }
  }

  return (
    <div className='volsIndiv'>
      <Paper className="ser-vol">
        
          <div className='voldetholder'>{
          volunteers.length?
            volunteers.map(v=>{
              var avcomment = getAvComment(v)
              return v.volunteerName?
                <div className='eachVol'>
                  <div className='eachVolDet'>
                    <div className='nameHolder'>
                      {v.reported?<div>
                        <i className="bi bi-check-circle-fill nameCheck"></i>
                      </div>:null}
                      <div className='nameact'>
                        <div>{v.volunteerName}</div>
                        <div className='volactbuttons'>
                          {!isNaN(v.volunteerPhone)?<a href={`tel:+91${v.volunteerPhone}`}><i className="bi bi-telephone-fill"></i></a>:null }
                          {!isNaN(v.volunteerPhone)?<a href={`https://wa.me/91${v.volunteerPhone}`} target="_blank"><i className="bi bi-whatsapp"></i></a>:null}
                          {!isNaN(v.volunteerPhone)?<a href={`https://wa.me/91${v.volunteerPhone}?text=${encodeURI(`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.volunteerName)}`)}`} target="_blank"><i className="bi bi-share-fill"></i></a>:null}
                          <a href={`/vol?name=${encodeURI(v.volunteerName)}`}><i className="bi bi-box-arrow-up-right"></i></a>
                        </div>
                      </div>
                    </div>
                    <div className='phonecat'>
                      <div className="servol_phone">{`${v.volunteerPhone}`}</div>
                      <div className="servol_category">{`${v.category} ${v.preacher && !serviceView?`(${v.preacher})`:""}`}</div>
                    </div>

                  </div>
                  {avcomment && <div className='avcomment'>{avcomment}</div>}
                  <HSep/>
                </div>
                :null
            })
            :"No volunteers"
        }
        </div>
      </Paper>
    </div>

  );
}

export default Vols;
