import Icon from "../icon"
import "./index.css"

const Selector = ({display, value, onSelect, onClose})=>{

    return <div className="cel-root" onClick={onClose}>
        <div className="cel-items">
        {
            display.map((d, i)=>{
                return <div className={`cel-item ${i==display.length-1?"last":""}`} onClick={()=>{
                    onSelect(value[i])
                }}>{d}</div>
            })
        }
        </div>
    </div>
}

export default Selector