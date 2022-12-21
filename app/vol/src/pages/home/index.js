import { useRef, useState } from 'react';
import './index.css';

function Home(props) {

  var pin = useRef()

  useState(()=>{
    pin.current && pin.current.focus()
  },[])

  return (
    <div className='home'>
      <input className='pin' type={"password"} ref={pin}/>
      <button className='pingo' onClick={()=>{
        if(pin.current.value=="8379"){
          window.location.pathname="/ser"
        }
      }}/>
    </div>
  )

}

export default Home;