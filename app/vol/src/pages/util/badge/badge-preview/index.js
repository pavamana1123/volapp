import React, { useState } from 'react'
import "./index.css"
import Badge from '../badge-card';

const BadgePreview = () => {
  const [frontImage, setFrontImage] = useState(null)
  const [backImage, setBackImage] = useState(null)

  const handleDrop = (e, front) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const imageData = event.target.result
        front?setFrontImage(imageData):setBackImage(imageData)
        localStorage.setItem(`badge-${front?"front":"back"}`, imageData)
      };

      reader.readAsDataURL(file)
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault()
  };

  return (
    <div className='bpr-root'>
        <div
            className='bpr-badge bpr-drop'
            onDrop={(e)=>{
                handleDrop(e, true)
            }}
            onDragOver={handleDragOver}
        >
            {frontImage?<Badge details={{
                name: "ok",
                seva: "ok",
                spoc: "ok"
            }}/>:<div className='bpr-prompt-text'>Drop FRONT IMAGE here</div>}
        </div>

        <div
            className='bpr-badge bpr-drop'
            onDrop={(e)=>{
                handleDrop(e, false)
            }}
            onDragOver={handleDragOver}
        >
            {backImage?<Badge details={{
                name: "ok",
                seva: "ok",
                spoc: "ok"
            }} back/>:<div className='bpr-prompt-text'>Drop BACK IMAGE here</div>}
        </div>
    </div>
  )
}

export default BadgePreview;
