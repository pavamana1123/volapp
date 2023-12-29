import { useState, useEffect, useRef } from 'react';
import './index.css';

function Auto(props) {

  var autodrop = useRef(0)

  var { filter, Drop, className, placeholder, autoValue, rootStyle } = props

  var [ list, setList ] = useState()
  var [ focus, setFocus ] = useState()

  var ip = useRef()
  var timer = useRef()

  useEffect(()=>{
    ip.current.focus()
  }, [])

  const onChangeDelay = (e)=>{
    clearTimeout(timer.current)
    timer.current = setTimeout(()=>{
      setList(ip.current.value?filter(ip.current.value):null)
    }, 250)
  }

  const onFocus = ()=>{
    setFocus(true)
  }

  const onBlur = (e)=>{
      setFocus(false)
  }

  return(
    <div className='autoRoot' style={rootStyle || {}}>
      <input className={`autoin ${className}`} ref={ip} 
        onChange={onChangeDelay}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder || 'Start typing your name...'}/>
      {list && <div className={`auto-drop ${focus?"auto-show":"auto-hide"}`} ref={autodrop} style={ip.current?{
        width: ip.current?`${ip.current.getBoundingClientRect().width}px`:"50vw"
      }:{}}>
        {
          list.length?list.map((l, i, ll)=>{
            return (
              <div className='auto-item'
                key={i}
                onClick={()=>{
                  ip.current.value=autoValue?autoValue(l):l
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
