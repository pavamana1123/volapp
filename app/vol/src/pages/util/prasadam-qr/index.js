import { useRef, useState } from "react"
import "./index.css"
import { QrReader } from 'react-qr-reader'
import Header from "../../../components/header"


const PrasadamQR = (props)=>{

    var { data } = props

    var x = useRef(0)
    
    var [res, setRes] = useState("")
    
    const handleScan = (data) => {
        if(data && data!==""){
            console.log(data.text)
            setRes(data.text)
        }
    }

    return (
        <div className="pqr-main">
            <Header title={data.title} hideOptions/>
            <div className="pqr-root">
                <div className="pqr-holder">
                    <QrReader
                        scanDelay={300}
                        onResult={handleScan}
                        constraints={{ facingMode: 'environment' }}
                        videoId="pqr-cam"
                        videoContainerStyle={{ padding: "0", width: "100vw" }}
                    />
                </div>
            </div>

            <div>{res}</div>
        </div>
    )
}

export default PrasadamQR