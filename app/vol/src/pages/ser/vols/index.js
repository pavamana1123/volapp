import HSep from '../../../components/HSep';
import { Paper } from '../../../components/paper';
import './index.css';

function Vols(props) {

  var { volunteers } = props


  return (
    <div className='volsIndiv'>
      <Paper>
        {
          volunteers.length?volunteers.map(v=>{
            return v.volunteerName?<div className='eachVol'>
              <div className='eachVolDet'>
                <div className='nameHolder'>
                  {v.reported?<div>
                    <i className="bi bi-check-circle-fill nameCheck"></i>
                  </div>:null}
                  <div>
                    <div>{v.volunteerName}</div>
                    <div className="servol_category">{v.category}</div>
                  </div>
                </div>
                  <div className='volactbuttons'>
                  {!isNaN(v.volunteerPhone)?<a href={`tel:+91${v.volunteerPhone}`}><i className="bi bi-telephone-fill"></i></a>:null }
                  {!isNaN(v.volunteerPhone)?<a href={`https://wa.me/91${v.volunteerPhone}`} target="_blank"><i className="bi bi-whatsapp"></i></a>:null}
                  {!isNaN(v.volunteerPhone)?<a href={`https://wa.me/91${v.volunteerPhone}?text=${encodeURI(`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.volunteerName)}`)}`} target="_blank"><i className="bi bi-share-fill"></i></a>:null}
                  <a href={`https://vol.iskconmysore.org/vol?name=${encodeURI(v.volunteerName)}`} target="_blank"><i className="bi bi-box-arrow-up-right"></i></a>
                </div>
              </div>
              <div className="servol_category redlight">{v.availability=="NOT AVAILABLE"?"⚠️ Not available or not filled the form":null}</div>
              <HSep/>
            </div>:null
          }): "No volunteers"
        }
      </Paper>
    </div>

  );
}

export default Vols;
