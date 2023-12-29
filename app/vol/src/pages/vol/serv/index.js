import './index.css';
import HSep from '../../../components/HSep';

function Serv(props) {

    var {details, i, sl, services, name, preset} = props

    let waGroupLink = services.filter(s=>{
        return s.serviceName == details.service
    })[0].waGroupLink

    return (
        <div className='service'>
            <div className='detailsDiv'>
                <div className='dark'>{`Service ${sl>1?i+1:""}`.trim()}</div>
                <div className='volSerName'>
                    <div className='detailFeild'>{details.service}</div>
                    {waGroupLink && <a className='volJoinHref' href={waGroupLink} target="_blank"><i className="bi bi-whatsapp spocdeticon">
                        <span className='volJoinGroup'> Click here to join service WhatsApp group</span> </i>
                    </a>}
                </div>
            </div>
            <div className='vol-section'>
                <div className='detailsDiv'>
                    <div className='light'>Timings</div>
                    <div className='detailFeild'>{`⏱️ ${details.timings.toTimingCase()}`}</div>
                </div>
                <vl className="vol-sep"/>
                <div className='detailsDiv'>
                    <div className='light'>Your Slot</div>
                    <div className='detailFeild'>{`⏱️ ${details.availability=="Whole Day" || details.availability=="Default" || details.availability=="NOT AVAILABLE"?details.timings.toTimingCase():details.availability}`}</div>
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

            {preset && name==details.spoc? 
                <a href={`/services?SPOC=${encodeURIComponent(name)}`} className='vol-show-vol'>Show Volunteers</a>
            :null}

            <HSep/>
        </div>
    )

}

export default Serv;

// 
