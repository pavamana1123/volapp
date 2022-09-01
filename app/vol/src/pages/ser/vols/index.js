import HSep from '../../../components/HSep';
import { Paper } from '../../../components/paper';
import './index.css';

function Vols(props) {

  var { volunteers } = props


  return (
    <div className='volsIndiv'>
      <Paper style={{
        margin:'-3vw 2vw 2vw 2vw',
        width: "85%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        }}>
        {
          volunteers.length?volunteers.map(v=>{
            return v.volunteerName?<div className='eachVol'>
              <div className='eachVolDet'>
                <div>{v.volunteerName}</div>
                <div>
                  {!isNaN(v.volunteerPhone)?<a href={`tel:+91${v.volunteerPhone}`}><i className="bi bi-telephone-fill"></i></a>:null }
                  {!isNaN(v.volunteerPhone)?<a href={`https://wa.me/91${v.volunteerPhone}`} target="_blank"><i className="bi bi-whatsapp"></i></a>:null}
                  {!isNaN(v.volunteerPhone)?<a href={`https://wa.me/91${v.volunteerPhone}?text=${encodeURI(`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.volunteerName)}`)}`} target="_blank"><i className="bi bi-share-fill"></i></a>:null}
                  <a href={`https://vol.iskconmysore.org/vol?name=${encodeURI(v.volunteerName)}`} target="_blank"><i className="bi bi-box-arrow-up-right"></i></a>
                </div>
              </div>
              <HSep/>
            </div>:null
          }): "No volunteers"
        }
      </Paper>
    </div>

  );
}

export default Vols;
