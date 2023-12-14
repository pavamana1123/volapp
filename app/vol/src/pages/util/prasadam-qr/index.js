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
                <QrReader
                    scanDelay={300}
                    onResult={handleScan}
                    className="pqr-camcont"
                    videoId="pqr-cam"
                    constraints={{ facingMode: 'environment' }}
                />
            </div>
            <div>{res}</div>
        </div>
    )
}

export default PrasadamQR