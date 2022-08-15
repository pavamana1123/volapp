import { useState, useEffect } from 'react';
import './index.css';

class PaperCtl {
  constructor(){
  }
  setFunc(f){
  }
}

function Paper(props) {

  var {children, style} = props

  return(
    <div className='paper' style={style}>
      {children}
    </div>
  )
}

export { Paper, PaperCtl };
