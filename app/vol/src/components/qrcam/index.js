import "./index.css"
import {useState, version } from "react"
import Icon from "../icon"
import { QrReader } from 'react-qr-reader'

const QRCam = (props)=>{

    var [ cameraState, setCameraState ] = useState(true)
    var [ cameraOrientation, setCameraOrientation ] = useState(true)
    var [ scanResult, setScanResult ] = useState()

    var { size, onResult, style, className, debounce } = props
    size = size || "90vw"
    style = style || {}
    className = className || ""

    const toggleCameraState = ()=>{
        setCameraState(!cameraState)
    }

    const toggleCameraOrientation = ()=>{
        setCameraOrientation(!cameraOrientation)
    }

    const onRes = (data, error)=>{
        if(error){
            return
        }

        if(!onRes){
            return
        }

        var url = new URL(data)
        if(url.host!="vol.iskconmysore.org"){
            onResult(null, true)
            return
        }

        setScanResult(pname=>{
            var name = url.searchParams.get("name")
            if(!debounce || name!=pname){
                onResult(name)
                return name
            }else{
                return pname
            }
        })
    }

    return (
        <div className={`qr-holder ${className}`}style={ {
                width: size,
                height: size,
                ...style}}>
            <div className="qr-options">
                <Icon name={cameraState?"toggle-on":"toggle-off"} color={cameraState?"white":"grey"} onClick={toggleCameraState}/>
                <Icon name="rotate-360" onClick={cameraState?toggleCameraOrientation:()=>{}} color={cameraState?"white":"grey"}/>
            </div>
            {cameraState?<QrReader
                className="qr-cam"
                scanDelay={500}
                onResult={onRes}
                constraints={{ facingMode: cameraOrientation?'user':'environment' }}
                videoId="qr-cam"
                videoContainerStyle={{ padding: "0", width: "100vw" }}
            />:<div className="qr-cam-off-msg">Camera is turned off</div>}
        </div>
    )
}

export default QRCam