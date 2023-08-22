import { useState, useEffect, useRef } from 'react';
import './index.css';

function Modal(props) {
  var self = this

  var {title, children, onClose} = props
  useEffect(()=>{
  },[])
   
  return (
    <div>
      <div className="glass light-glass"/>
      <div className='modalBox'>
        <div className='modalTitleHolder'>
            <div className='modal-title'>{title}</div>
            <div className='mcb' onClick={onClose || (()=>{})}>❌</div>
        </div>
        <div className='modalBody'>{children}</div>
      </div>
    </div>

  );
}

export default Modal
