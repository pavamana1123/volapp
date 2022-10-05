import { Paper } from '../../../components/paper';
import './index.css';

function Serv(props) {

  var { service, volunteers } = props

  var volCount = volunteers.filter(v=>{return v.service==service.serviceName}).length
  var repCount = volunteers.filter(v=>{return v.service==service.serviceName && v.reported}).length

  return (
    <div className='servIndiv'>
        <Paper style={{margin:'2vw', width: "85%"}}>
            <div>{service.serviceName}</div>
            <div className='serviceDetails'>
                {`⏱️ ${service.timings}`}
            </div>
            <div className='serviceDetails'>
                {`👑 ${service.coordinator}`}
            </div>
            <div className='serviceDetails'>
                <div className='spocPhoneDet'>
                    <div style={{marginRight:"3vw", color:"#555"}}>{`🥇 ${service.spoc}`}</div>
                    {!isNaN(service.spocPhone)?<a href={`tel:+91${service.spocPhone}`}><i className="bi bi-telephone-fill"></i></a> : null}
                    {!isNaN(service.spocPhone)?<a href={`https://wa.me/91${service.spocPhone}`} target="_blank"><i className="bi bi-whatsapp"></i></a>:null}                    
                </div>
            </div>
            {repCount?<div className='serviceDetails'>
                {`✅ ${repCount==volCount?"All":`${repCount}/${volCount}`} have reported to the service`}
            </div>:null}
        </Paper>
    </div>

  );
}

export default Serv;
