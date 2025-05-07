import { useCallback, useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
import Icon from '../icon'
import { StyledBadge, StyledDP } from './styled'

const cdnBase = 'https://cdn.iskconmysore.org/content'

const DP = ({ url, user, size, className, onClick, badge, enlarge }) => {
  className = className || ""

  if (!Array.isArray(size)) {
    if (size) {
      size = [size, size / 3]
    } else {
      size = [7, 2.333]
    }
  }

  var [background, setBackground] = useState({})
  var [text, setText] = useState("")
  var [showEn, setShowEn] = useState(false)

  useEffect(() => {
    if (user) {
      axios.get(`${cdnBase}?v=${user.dp}`, {
        responseType: 'arraybuffer',
        params: {
          path: `sevabase/dp/${user.id}.jpeg`
        }
      })
        .then((res) => {
          setBackground({
            backgroundImage: `url(data:image/jpeg;base64,${btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          })
        })
        .catch(() => {
          setBackground({
            background: user ? user.name.color() : "#555"
          })
          setText(user ? user.name.initial() : "")
        })
    } else {
      setBackground({
        backgroundImage: `url('${url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      })
    }

  }, [url])

  var badgeSize, badgeColor, badgeAngle, iconName, iconSize, iconColor, iconClick

  if (badge) {
    if (!Array.isArray(badge.size)) {
      if (badge.size) {
        badgeSize = [badge.size, badge.size / 3]
      } else {
        badgeSize = size.map(s => .4 * s)
      }
    } else {
      badgeSize = badge.size
    }
    badgeColor = badge.color || 'white'
    badgeAngle = badge.angle || 135
    if (badge.icon) {

      if (!Array.isArray(badge.icon.size)) {
        if (badge.icon.size) {
          iconSize = [badge.icon.size, badge.icon.size / 3]
        } else {
          iconSize = badgeSize.map(b => .65 * b)
        }
      } else {
        iconSize = badge.icon.size
      }

      iconName = badge.icon.name
      iconColor = badge.icon.color || '#555'
      iconClick = badge.icon.onClick
    }
  }

  const onIconClick = (e) => {
    if (iconClick) {
      e.stopPropagation()
      iconClick()
    }
  }

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick()
    }
    if (enlarge && !showEn && background.backgroundImage) {
      setShowEn(true)
    }
  }, [background])

  const handleCloseEn = (e) => {
    e.stopPropagation()
    setShowEn(false)
  }

  const handleEnClick = (e) => {
    e.stopPropagation()
  }

  const key = (user && user.id) || url

  const downloadImage = () => {
    const imageUrl = user ? `${cdnBase}?v=${user.dp}&path=/sevabase/dp/${user.id}.jpeg` : url

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `${user ? (user.name || 'User') : 'User'} - SevaBase.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(blobUrl)
      })
      .catch(error => console.error('Download failed:', error))
  }

  return (
    <div className={`dp-cont ${className}`} onClick={handleClick} key={key}>
      {showEn ?
        <div className='dp-en-bg' onClick={handleCloseEn} key={`bg-${key}`}>

          <div className='dp-en-cont'>
            {/* <div className='dp-en-down' onClick={downloadImage}>
              <Icon name='download' color='white' />
            </div> */}
            <div className={`dp-en`} style={background} onClick={handleEnClick}>{text}</div>
          </div>

        </div> : null}
      <StyledDP style={{ ...background }} size={size}>{text}</StyledDP>
      {badge ?
        <StyledBadge size={size} badgeSize={badgeSize} angle={badgeAngle} style={{ backgroundColor: badgeColor }}>
          {badge.icon ? <Icon onClick={onIconClick} className='dp-icon' name={iconName} color={iconColor} size={iconSize} /> : null}
        </StyledBadge>
        : null
      }
    </div>
  );
}

export default DP;
