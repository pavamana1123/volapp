import { useState, useEffect, useRef } from 'react';
import './index.css';

function Auto(props) {

  var { filter, Drop, inputClass } = props

  var [ list, setList ] = useState()
  var [ focus, setFocus ] = useState()

  var ip = useRef()
  var timer = useRef()

  const onChangeDelay = (e)=>{
    clearTimeout(timer.current)
    timer.current = setTimeout(()=>{
      setList(ip.current.value?filter(ip.current.value):null)
    }, 250)
  }

  const onFocus = ()=>{
    setFocus(true)
  }

  const onBlur = ()=>{
    setTimeout(()=>{
      setFocus(false)
    }, 100)
  }

  return(
    <div className='autoRoot'>
      <input className={`autoin ${inputClass}`} ref={ip} 
        onChange={onChangeDelay}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder='Start typing your name...'/>
      {list && focus && <div className='auto-drop'>
        {
          list.length?list.map((l, i, ll)=>{
            return (
              <div className='auto-item'
              key={i}
                onClick={()=>{
                ip.current.value=l
                setList([l])
              }}>
                <Drop item={l} value={l}/>
              </div>
            )
          }):`"${ip.current.value}" is not found`
        }
      </div>}
    </div>
  )
}

export default Auto;
