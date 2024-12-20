import './index.css';
import Header from "../../components/header"
import { useEffect, useState } from 'react';
import { Paper } from '../../components/paper';
import Tab from '../../components/tab';
import Serv from './serv';
import { Spinner } from '../../components/spinner';
import moment from 'moment'
import Auto from '../../components/auto';

function Vol(props) {

  var [filter, setFilter] = useState('')
  var [preset, setPreset] = useState('')
  var [showApp, setShowApp] = useState(false)
  var [volunteerNames, setVolunteerNames] = useState('')
  var { data, dates } = props
  var { volunteers, services, events } = data

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setFilter(urlParams.get('name'))
    setPreset(!!urlParams.get('name'))
  }, [])

  // useEffect(() => {

  //   if (!data.volunteers || showApp) {
  //     return
  //   }

  //   fetch('/api', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       endpoint: '/verify-user'
  //     },
  //     body: JSON.stringify({
  //       id: data.volunteers.filter(volunteer => volunteer.volunteerName == filter)[0].volunteerPhone,
  //     })
  //   }).then(res => {
  //     if (!res.ok) {
  //       setShowApp(true)
  //     }
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }, [data, filter, showApp])

  useEffect(() => {
    var vn = {}
    volunteers && volunteers.map(v => {
      if (v.volunteerName != "") {
        vn[v.volunteerName] = 0
      }
    })
    setVolunteerNames(Object.keys(vn).sort())
  }, [data])

  const NoServ = <div style={{ color: "#333", margin: "5vw", display: "flex", justifyContent: "center" }}>{"No services"}</div>

  const filterFunc = (f) => {
    return volunteerNames.filter(v => {
      return v.toLowerCase().includes(f.toLowerCase())
    })
  }

  const Drop = (props) => {
    var { item, value } = props
    return <div className='volnameauto'
      onClick={() => {
        setFilter(value)
      }}>
      {item}
    </div>
  }

  const register = () => {
    window.open("https://sevabase.iskconmysore.org/register", "_blank")
  }

  return (
    <div>
      <Header title={data.title} hideOptions />

      <div className='vol-main'>

        <div className='vol'>
          {preset ?
            <Paper>{filter}</Paper>
            :
            <Auto className="autoinvol" filter={filterFunc} Drop={Drop} />
          }

          {filter && dates.length ?
            <Paper className="serpaper">
              {!preset && <div className='volnameintab'>{filter}</div>}
              {
                <Tab
                  tabs={
                    dates.filter(d => {
                      return !!volunteers.filter(v => {
                        return v.date == d && v.volunteerName == filter && v.service != ""
                      }).length && !events.filter(e => {
                        return e.date == d
                      })[0].hide
                    }).map((d) => {

                      var svs1 = volunteers.filter(v => {
                        return v.volunteerName == filter && v.date == d
                      })

                      const mainService = svs1.sort((s1, s2) => {
                        return s2.serviceDuration - s1.serviceDuration
                      })[0]

                      var svs = svs1.map((s, i, ss) => {
                        return <Serv details={s} services={services} i={i} sl={ss.length} mainService={mainService} name={filter} preset={preset} />
                      })

                      return {
                        title: dates.length == 1 ? moment(d, "YYYY-MM-DD").format("dddd, Do MMMM YYYY") : (dates.length < 5 ? moment(d, "YYYY-MM-DD").format("Do MMM") : moment(d, "YYYY-MM-DD").format("MMM D")),
                        component: svs.length ?
                          <div className='vol-events-holder'>
                            <div className='event-name'>{`${data.events.filter(e => {
                              return e.date == d
                            })[0].event} (${svs.length} service${svs.length > 1 ? "s" : ""})`.trim()}</div>
                            <div className='voldetholderv'>
                              <div style={{ width: '100%' }}>{svs}</div>
                              {data.events.filter(e => {
                                return e.date == d
                              })[0].coupon && false && <div className='pracoup'>
                                  <div className='dark'>Collect Prasadam Coupon from</div>
                                  {<div style={{
                                    display: "flex",
                                    alignItems: "center"
                                  }}>
                                    <div className='spocdetholder'>
                                      <div className='detailFeild' style={{ marginRight: "2vw" }}>
                                        <div>{`${mainService.spoc}`}</div>
                                        <div className='spocdetphone'>{`${mainService.spocPhone}`}</div>
                                      </div>
                                      <div className='spocdeticons'>
                                        {!isNaN(mainService.spocPhone) ? <a href={`tel:+91${mainService.spocPhone}`}><i className="bi bi-telephone-fill spocdeticon"></i></a> : null}
                                        {!isNaN(mainService.spocPhone) ? <a href={`https://wa.me/91${mainService.spocPhone}`} target="_blank"><i className="bi bi-whatsapp spocdeticon"></i></a> : null}
                                      </div>
                                    </div>
                                  </div>}
                                </div>}
                            </div>
                          </div>
                          : NoServ
                      }
                    })
                  } 
                  
                  emptyMessage={"No services assigned"}/>
              }

            </Paper>
            :
            (filter && <Spinner style={{ marginTop: "2vw" }} size={2} />)}
        </div>

        {null && <Paper className="vol-note">
          <b>Note:</b>
          <ol>
            <li className='vol-note-li'>Every service has got a Single Point-of-Contact (SPOC). Contact your SPOC(s) and understand all details of your service like timings, dress code etc.</li>
            <li className='vol-note-li'>Volunteer Badge will be issued from Saturday, 24th August 2024, 4 PM onwards. Collect without fail.</li>
            <li className='vol-note-li'>Volunteer Badge must be used to avail parking facility and prasadam during Sri Krishna Janmashtami festival (25th & 26th Aug). So please collect and bring your badge without fail.</li>
            <li className='vol-note-li'>Volunteer prasadam (breakfast, lunch and dinner) is arranged in the back-side of the basement of new temple building. You can reach there through the entry to basement near the Goshala.</li>
            <li className='vol-note-li'>Volunteer parking facility is made near the new temple building, beside the concrete machine.</li>
            <li className='vol-note-li'>Volunteer Care Cell will be located in front of the book counter near the temple flower garden. Please contact the cell for any queries.</li>
          </ol>
        </Paper>}

        {showApp &&
          <Paper className='vol-app-paper'>
            <div className='vol-note-main'>
              <div className='vol-app-note'>SevaBase App</div>
              <div className='vol-app-desch'>
                <img src="sevabase.png" width="100vw" height="100vw" />
                <div className='vol-app-cta'>We are planning to build an app called SevaBase for all volunteering purposes in future. To make this app, we need details of all the volunteers. Click the button below to fill your details for the the app.</div>
              </div>
              <div className='vol-app-action' onClick={register}>Click here to fill your details</div>
            </div>
          </Paper>
        }
        <div style={{ margin: "15vw" }} />
      </div>
    </div>
  );
}

export default Vol;
