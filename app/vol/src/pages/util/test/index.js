import { useEffect, useRef } from "react";
import "./index.css"
import QRCode from 'qrcode.react';

const Test = (props) => {

    var qr = useRef()

    return (
        <div ref={qr}>
            <QRCode
                value={"https://donations.iskconmysore.org/square-feet-seva/?utm_source=of&utm_medium=ctr&utm_campaign=skj"}
                size={512}
            />
        </div>
    )
}

export default Test

