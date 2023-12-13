import { useEffect, useRef } from "react";
import "./index.css"
import QRCode from 'qrcode.react';

const Test = (props) =>{

    var qr = useRef()

    return (
        <div ref={qr}>
            <QRCode
                value={"https://vol.iskconmysore.org/vol?name=asdasdasd"}
                size={512}
            />
        </div>
    )
}

export default Test

