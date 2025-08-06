import React, { useCallback, useEffect, useState } from 'react'
import "./index.css"
import Badge from '../badge-card';
import Auto from '../../../../components/auto'
import Icon from '../../../../components/icon';

const BadgePreview = ({ data, dates }) => {
  const [frontImage, setFrontImage] = useState(null)
  const [backImage, setBackImage] = useState(null)
  const [date, setDate] = useState(null)
  const [volunteers, setVolunteers] = useState(null)
  const [volunteer, setVolunteer] = useState(null)
  const [volunteerIndex, setVolunteerIndex] = useState(-1)

  const handleDrop = (e, front) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const imageData = event.target.result
        front ? setFrontImage(imageData) : setBackImage(imageData)
        localStorage.setItem(`badge-${front ? "front" : "back"}`, imageData)
      };

      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  useEffect(() => {

    if (!data || !Object.keys(data).length || !date) {
      return
    }

    var serviceNameMap = {}

    let { volunteers, services } = data
    volunteers = volunteers.filter(v => {
      return !v.idCardPrinted && v.volunteerName && v.volunteerPhone && v.service && v.date == date
    })

    services = services.filter(s => {
      return s.date == date
    })

    let volunteersMap = {}
    volunteers.map(v => {
      if (volunteersMap[v.volunteerName]) {
        if (v.serviceDuration > volunteersMap[v.volunteerName].serviceDuration) {
          volunteersMap[v.volunteerName] = v
        }
      } else {
        volunteersMap[v.volunteerName] = v
      }
    })

    services.forEach(s => {
      serviceNameMap[s.serviceName] = s.mainService
    })

    setVolunteers(Object.keys(volunteersMap).sort().map(v => {
      return {
        volunteerName: v,
        service: serviceNameMap[volunteersMap[v].service],
        spoc: volunteersMap[v].spoc
      }
    }))

  }, [data, date])

  useEffect(() => {
    var fi = localStorage.getItem(`badge-front`)
    var bi = localStorage.getItem(`badge-back`)

    if (fi) {
      setFrontImage(fi)
    }

    if (bi) {
      setBackImage(bi)
    }
  }, [])

  const autoFilter = useCallback((f) => {

    if (!volunteers) {
      return []
    }

    return volunteers.filter(v => {
      return v.volunteerName.toLowerCase().indexOf(f.toLowerCase()) != -1
    })
  }, [volunteers])

  const Drop = (props) => {
    var { item, value } = props
    return <div className='bpr-auto-drop'
      onClick={() => {
        setVolunteer(value)
      }}>
      {item.volunteerName}
    </div>
  }

  const onDateChange = (e) => {
    setDate(e.target.value)
  }

  const move = useCallback((step) => {

    if (!(volunteers && volunteers.length)) {
      return
    }

    if (volunteerIndex == -1) {
      setVolunteerIndex(0)
      return
    }
    var index = volunteerIndex + step
    if (index < 0) {
      setVolunteerIndex(volunteers.length + index)
    } else {
      setVolunteerIndex(index % volunteers.length)
    }

  }, [volunteerIndex, volunteers])

  useEffect(() => {
    if (!volunteers) {
      return
    }
    setVolunteer(volunteers[volunteerIndex])
  }, [volunteerIndex, volunteers])

  return (
    <div className='bpr-root'>

      {dates && data && data.volunteers ?
        <div className='bpr-inputs'>
          <div className='bpr-date-input'>
            <label className='bpr-date-input-label'>Date</label>
            <select className='bpr-date-select' onChange={onDateChange}>
              {
                [<option />].concat(dates.map(d => {
                  return <option selected={d == date}>{d}</option>
                }))
              }
            </select>
          </div>

          <div className='bpr-next-holder'>
            <Icon className="bpr-next" name="arrow-circle-left" color="#555" size="2vw" onClick={() => { move(-1) }} />
            <Auto
              rootStyle={{ margin: '0' }}
              className="bpr-auto"
              filter={autoFilter}
              Drop={Drop}
              autoValue={v => v.volunteerName}
              placeholder={"Start typing volunteer name.."}
            />
            <Icon className="bpr-next" name="arrow-circle-right" color="#555" size="2vw" onClick={() => { move(1) }} />
            {volunteerIndex != -1 && volunteers ? <div className='bpr-of-count'>{`${volunteerIndex + 1} of ${volunteers.length}`}</div> : null}
          </div>
        </div>
        : null}

      <div className='bpr-images'>
        <div
          className='bpr-badge bpr-drop'
          onDrop={(e) => {
            handleDrop(e, true)
          }}
          onDragOver={handleDragOver}
        >
          {frontImage ? <Badge details={{
            name: volunteer ? volunteer.volunteerName : "-NA-",
            seva: volunteer ? volunteer.service : "-NA-",
            spoc: volunteer ? volunteer.spoc : "-NA-",
            id: volunteer ? volunteer.sevaBaseID : "-NA-"
          }} /> : <div className='bpr-prompt-text'>Drop FRONT IMAGE here</div>}
        </div>

        <div
          className='bpr-badge bpr-drop'
          onDrop={(e) => {
            handleDrop(e, false)
          }}
          onDragOver={handleDragOver}
        >
          {backImage ? <Badge details={{
            name: "ok",
            seva: "ok",
            spoc: "ok"
          }} back /> : <div className='bpr-prompt-text'>Drop BACK IMAGE here</div>}
        </div>

        <div className='bpr-names'>
          {
            volunteers ? volunteers.map(v => {
              return <div>{v.volunteerName}</div>
            }) : null
          }
        </div>
      </div>
    </div>
  )
}

export default BadgePreview;
