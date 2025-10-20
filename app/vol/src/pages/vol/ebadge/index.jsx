import QRCode from 'qrcode.react';
import { Paper } from "../../../components/paper"
import DP from '../../../components/dp'
import "./index.css"
import { useState } from 'react';
import moment from 'moment';

const EBadge = props => {

    const { vol, dates } = props
    const id = vol.sevaBaseID
    const { name } = vol

    const [time, setTime] = useState(moment().format("DD-MM-YYYY HH:mm:ss"))

    setInterval(() => {
        setTime(moment().format("DD-MM-YYYY HH:mm:ss"))
    }, 1000)

    return (
        <div>
            <Paper style={{ marginTop: "2vw" }}>
                <div className="ebadge-main">
                    <div className='ebadge-name'>{vol.name}</div>
                    <DP user={{ id }} size={[40, 8]} enlarge></DP>
                    <div className={'ebadge-qr'}><QRCode
                        value={name ? `https://vol.iskconmysore.org/vol?name=${encodeURIComponent(name)}&date=${(dates || []).join("+")}${id ? `&id=${id}` : ''}` : `https://vol.iskconmysore.org/vol`}
                        size={0.5623 * window.innerWidth}
                    /></div>
                    <div style={{ fontSize: "4vw", marginBottom: "2vw" }}>{time}</div>

                    <div className='ebadge-color1'></div>
                </div>


            </Paper>
        </div>
    )
}

export default EBadge