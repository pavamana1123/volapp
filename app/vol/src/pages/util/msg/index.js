import { useEffect, useRef, useState } from 'react';
import './index.css';
import templates from './templates';

function Msg(props) {

  var linkDiv = useRef()
  var nameDiv = useRef()
  var [links, setLinks] = useState([])
  var [selectedName, setSelectedName] = useState("")
  var [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(()=>{
    if(linkDiv.current){
      linkDiv.current.textContent = links.join("\n")
      nameDiv.current.textContent = getNamesFromLinks(links).join("\n")
    }
  },[links])

  if(props.isLoading){
    return <div>{"Loading"}</div>
  }

  return (
    <div className='msgRoot'>
      <select className='msgfunc' onChange={(e)=>{
        setLinks(e.target.value != "None"?templates[e.target.value](props):[])
      }}>
        {
          ["None"].concat(Object.keys(templates).sort()).map((f)=>{
            return <option value={f}>{f}</option>
          })
        }
      </select>
      <div className='msgmain'>
        <div className='msgtxt'>
          <div className='links' ref={linkDiv} contentEditable/>
          <div className='names' ref={nameDiv} contentEditable/>
        </div>
        <div className='msgnamesbuttons'>
          {
            getNamesFromLinks(links).map((name, i)=>{
              return <div className='msgnamebutton' key={name} onClick={()=>{
                setSelectedName(name)
                setSelectedIndex(i)
              }}>{name}</div>
            })
          }
        </div>
        <div className='msgwa'>
          <div className='msgheader'>
            {selectedName}
          </div>
          <div className='msgMsg'>
            <div className='msgMsgTxt'>
              {selectedIndex==-1?"":decodeURIComponent(new URLSearchParams(new URL(links[selectedIndex]).search).get("text"))}
            </div>
          </div>
        </div>
        </div>
    </div>

  );
}

function getNamesFromLinks(links){
  return links.map((l)=>{
    return new URLSearchParams(new URL(l).search).get("name")
  })
}

export default Msg;
