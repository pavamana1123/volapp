import './index.css';
import { useState, useEffect, useRef } from 'react';

function Tab(props) {

  var [activeTab, setActiveTab] = useState(props.defaultActive || 0)
  var self=this
  const {tabs, onTabChange, emptyMessage} = props

  return (
    <div className='tab'>
      <div className='tabHeader'>
        <div className='tabHeaderItems '>
          {
            tabs.map((tab, i)=>{
              return (
                <div className={`tabHeaderItem ${activeTab==i?"selectedtab":""} ${i==tabs.length-1?"last-thi":""}`} key={i} onClick={()=>{
                  setActiveTab.bind(self)(i)
                  onTabChange && onTabChange(i, tab.value)
                }}>{tab.title}</div>
              )
            })
          }
        </div>
        {false && <div className='tabUnderline' style={{
          width:`${100/tabs.length}%`,
          left: `${activeTab*(100/tabs.length)}%`
          }}>
        </div>}
      </div>

      <div className='tabChildren'>
        {tabs[activeTab] ? tabs[activeTab].component : <div style={{textAlign: "center", margin: "2vw"}}>{emptyMessage}</div>}
      </div>

    </div>
  )
}

export default Tab;
