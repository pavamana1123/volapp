import { Paper } from '../../../components/paper';
import './index.css';

function Serv(props) {

  var { service } = props

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
                    <div style={{marginRight:"3vw"}}>{`🥇 ${service.spoc}`}</div>
                    <a href={`tel:+91${service.spocPhone}`}><i className="bi bi-telephone-fill"></i></a> 
                    <a href={`https://wa.me/91${service.spocPhone}`} target="_blank"><i className="bi bi-whatsapp"></i></a>
                </div>
            </div>
        </Paper>
    </div>

  );
}

export default Serv;
