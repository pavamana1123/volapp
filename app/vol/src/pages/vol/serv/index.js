import './index.css';
import moment from 'moment'
import HSep from '../../../components/HSep';

function Serv(props) {

    var {details} = props

    return (
        <div className='service'>
            <div className='detailsDiv'>
                <div className='light'>Service</div>
                <div className='detailFeild'>{details.service}</div>
            </div>
            <div className='detailsDiv'>
                <div className='light'>Timings</div>
                <div className='detailFeild'>{`⏱️ ${details.timings}`}</div>
            </div>
            <div className='detailsDiv'>
                <div className='light'>Co-Ordinator</div>
                <div className='detailFeild'>{`${details.coordinator}`}</div>
            </div>
            <div className='detailsDiv'>
                <div className='light'>In-charge</div>
                {<div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <div className='detailFeild' style={{marginRight: "2vw"}}>{`${details.spoc}`}</div>
                    <a href={`tel:+91${details.spocPhone}`}><i className="bi bi-telephone-fill"></i></a> 
                    <a href={`https://wa.me/91${details.spocPhone}`} target="_blank"><i className="bi bi-whatsapp"></i></a>
                </div>}
            </div>
            <HSep/>
        </div>
    )

}

export default Serv;

// 
