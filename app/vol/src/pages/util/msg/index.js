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
      <div className='msgOptions'>
        <select className='msgfunc' onChange={(e)=>{
          setSelectedIndex(-1)
          setSelectedName("")
          setLinks(e.target.value != "None"?templates[e.target.value](props):[])
        }}>
          {
            ["None"].concat(Object.keys(templates).sort()).map((f)=>{
              return <option value={f}>{f}</option>
            })
          }
        </select>
        <div className='msgCount'>`{`(${links?links.length:0})`}</div>
      </div>

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
            <div className='msgMsgTxt' dangerouslySetInnerHTML={{
              __html: selectedIndex==-1?"":(()=>{
                  const text = decodeURIComponent(new URLSearchParams(new URL(links[selectedIndex]).search).get("text"))
                  var textArr = text.split("")
                  var bc = 0
                  var ic = 0
                  for (let i=0; i < textArr.length; i++) {
                    if(textArr[i]=="*"){
                      textArr[i]=bc%2==0?"<b>":"</b>"
                      bc++
                    }else if(textArr[i]=="_"){
                      textArr[i]=ic%2==0?"<i>":"</i>"
                      ic++
                    }
                  }
                  return textArr.join("")
                })()
              }}
            />
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
