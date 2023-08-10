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
            <div className='vol-section'>
                <div className='detailsDiv'>
                    <div className='light'>Timings</div>
                    <div className='detailFeild'>{`⏱️ ${details.timings}`}</div>
                </div>
                <vl className="vol-sep"/>
                <div className='detailsDiv'>
                    <div className='light'>Your Slot</div>
                    <div className='detailFeild'>{`⏱️ ${details.availability=="All slots"?details.timings:details.availability}`}</div>
                </div>
            </div>
            <div className='detailsDiv'>
                <div className='light'>Co-Ordinator</div>
                <div className='detailFeild'>{`${details.coordinator}`}</div>
            </div>
            <div className='detailsDiv'>
                <div className='light'>In-charge (SPOC)</div>
                {<div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <div className='detailFeild' style={{marginRight: "2vw"}}>{`${details.spoc}`}</div>
                    {!isNaN(details.spocPhone)?<a href={`tel:+91${details.spocPhone}`}><i className="bi bi-telephone-fill"></i></a>:null}
                    {!isNaN(details.spocPhone)?<a href={`https://wa.me/91${details.spocPhone}`} target="_blank"><i className="bi bi-whatsapp"></i></a>:null}
                </div>}
            </div>
            <HSep/>
        </div>
    )

}

export default Serv;

// 
