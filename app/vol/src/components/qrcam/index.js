import "./index.css"
import {useEffect, useRef, useState } from "react"
import Icon from "../icon"
import { QrReader } from 'react-qr-reader'

const QRCam = (props)=>{

    var [ cameraState, setCameraState ] = useState(false)
    var [ cameraOrientation, setCameraOrientation ] = useState(true)
    var [ scanResult, setScanResult ] = useState()
    var [ cameraSwitching, setCameraSwitching ] = useState(false)
    var [ speakState, setSpeakState ] = useState(true)
    var [ showCamera, setshowCamera ] = useState(true)
    
    const synthesis = window.speechSynthesis
    const chime = useRef(new Audio(`https://cdn.iskconmysore.org/content?path=volapp/capture.mp3`))

    var { size, onResult, style, className, debounce } = props
    size = size || "90vw"
    style = style || {}
    className = className || ""

    const toggleCameraState = ()=>{
        setCameraState(!cameraState)
    }

    const toggleCameraOrientation = ()=>{
        setCameraState(()=>{
            setCameraSwitching(true)
            setTimeout(()=>{
                setCameraOrientation(p=>!p)
                setCameraState(true)
                setCameraSwitching(false)
            }, 1000)
            return false
        })
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
                setSpeakState(p=>{
                    if(p){
                        chime.current.play()
                        speak(name)
                    }
                    return p
                })
                onResult(name)
                return name
            }else{
                return pname
            }
        })
    }

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text)
        const voice = synthesis.getVoices().find(voice => voice.lang === 'hi-IN')
        utterance.voice = voice
        synthesis.speak(utterance)
    }

    const toggleSpeakState = ()=>{
        setSpeakState(p=>!p)
    }

    return (
        <div className={`qr-holder ${className}`}style={ {
                width: size,
                height: size,
                ...style}}>
            <div className="qr-options">
                <Icon name={cameraState?"toggle-on":"toggle-off"} color={cameraState?"white":"grey"} onClick={toggleCameraState}/>
                <Icon name="rotate-360" onClick={cameraState?toggleCameraOrientation:()=>{}} color={cameraState?"white":"grey"}/>
                <Icon name={speakState?"volume-up":"volume-off"} color={cameraState && speakState ?"white":"grey"} onClick={toggleSpeakState}/>
                <Icon name={"expand-less"} color={"white"} onClick={toggleSpeakState}/>
            </div>
            {cameraState?<QrReader
                className="qr-cam"
                scanDelay={500}
                onResult={onRes}
                constraints={{ facingMode: !cameraOrientation?'user':'environment' }}
                videoId="qr-cam"
                videoContainerStyle={{ padding: "0", width: "100vw" }}
            />:<div className="qr-cam-off-msg">{cameraSwitching?"Switching camera..":"Camera is turned off"}</div>}
        </div>
    )
}

export default QRCam