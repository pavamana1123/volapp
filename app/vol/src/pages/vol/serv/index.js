import './index.css';
import moment from 'moment'
import HSep from '../../../components/HSep';

function Serv(props) {

    var {details, i} = props

    console.log(details)

    return (
        <div className='service'>
            <div className='detailsDiv'>
                <div className='dark'>{`Service ${i+1}`}</div>
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
                    <div className='detailFeild'>{`⏱️ ${details.availability=="All slots" || details.availability=="Default"?details.timings:details.availability}`}</div>
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
                    <div className='spocdetholder'>
                        <div className='detailFeild' style={{marginRight: "2vw"}}>
                            <div>{`${details.spoc}`}</div>
                            <div className='spocdetphone'>{`${details.spocPhone}`}</div>
                        </div>
                        <div className='spocdeticons'>
                            {!isNaN(details.spocPhone)?<a href={`tel:+91${details.spocPhone}`}><i className="bi bi-telephone-fill spocdeticon"></i></a>:null}
                            {!isNaN(details.spocPhone)?<a href={`https://wa.me/91${details.spocPhone}`} target="_blank"><i className="bi bi-whatsapp spocdeticon"></i></a>:null}
                        </div>
                    </div>
                </div>}
            </div>
            <HSep/>
        </div>
    )

}

export default Serv;

// 
