import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import "./index.css"

const Badge = (props) => {
    const { name, seva, spoc, dates, id } = props.details
    const { back, style } = props

    var [frontImage, setFrontImage] = useState()
    var [backImage, setBackImage] = useState()

    useEffect(() => {
        const f = localStorage.getItem('badge-front')
        const b = localStorage.getItem('badge-back')

        if (f) {
            setFrontImage(f)
        }

        if (b) {
            setBackImage(b)
        }
    }, [])

    return (
        <div className="bp-badge" style={{
            backgroundImage: `url(${back ? backImage : frontImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '3.75in',
            height: '5in'
        }}>
            {/* <div className="bp-plus-holder">
                    <div className="bp-plus-row-holder">
                        <div className="bp-plus bp-plus-lt"></div>
                        <div className="bp-plus bp-plus-rt"></div>
                    </div>
                    <div className="bp-plus-row-holder">
                        <div className="bp-plus bp-plus-lb"></div>
                        <div className="bp-plus bp-plus-rb"></div>
                    </div>
                </div> */}

            <div className='bp-lt' />
            <div className='bp-lb' />
            <div className='bp-rt' />
            <div className='bp-rb' />

            {!back ?
                <div className="bp-details" style={back ? {} : style}>
                    <div className="bp-detail">
                        <div className="bp-detail-label">NAME</div>
                        <div className="bp-detail-text">{name}</div>
                    </div>
                    <div className="bp-detail">
                        <div className="bp-detail-label">SEVA</div>
                        <div className="bp-detail-text">{seva}</div>
                    </div>
                    <div className="bp-detail">
                        <div className="bp-detail-label">SPOC</div>
                        <div className="bp-detail-text">{spoc}</div>
                    </div>
                </div> :
                <div className="bp-qr" style={back ? style : {}}>
                    <QRCode
                        value={name ? `https://vol.iskconmysore.org/vol?name=${encodeURIComponent(name)}&date=${(dates || []).join("+")}${id ? `&id=${id}` : ''}` : `https://vol.iskconmysore.org/vol`}
                        size={230}
                    />
                </div>
            }

        </div>
    )
}

export default Badge