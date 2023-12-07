import { useEffect, useRef } from "react";
import "./index.css"
import QRCode from 'qrcode.react';

const Test = (props) =>{

    var qr = useRef()

    return (
        <div ref={qr}>
            <QRCode
                value={"https://vol.iskconmysore.org/vol?name=Abhishek R"}
                size={512}
                imageSettings={{
                    src: "https://logowik.com/content/uploads/images/apple-black8038.jpg",
                    excavate: true
                }}
            />
        </div>
    )
}

export default Test

