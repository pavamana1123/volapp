import { useRef } from 'react';
import './index.css';
function Msg(props) {

  var linkDiv = useRef()
  var nameDiv = useRef()

  var {volunteers, services, master, events} = props.data

  const dates = [
    "2022-12-31",
    "2023-01-01",
    "2023-01-02"
  ]

  var umap = {}
  var voldet = {}

  if(!!Object.keys(props.data).length){
    master.map(c=>{
      if(dates.indexOf(c.date)!=-1){
        umap[c.name]=c.phone
      }
    })

    var volunteers = volunteers.filter(v=>{
      return dates.indexOf(v.date)!=-1 && !v.invMsgSent
    })
  
  
    Object.keys(umap).map(name=>{
      for(var i=0; i<volunteers.length; i++){
        if(volunteers[i].volunteerName==name){
          if(!voldet[name]){
            voldet[name]={
              name,
              phone: volunteers[i].volunteerPhone,
              services:[]
            }
          }
          voldet[name].services.push({
            date: volunteers[i].date,
            service: volunteers[i].service,
            timings: volunteers[i].timings,
            coordinator: volunteers[i].coordinator,
            spoc: volunteers[i].spoc,
            spocPhone: volunteers[i].spocPhone
          })
        }
      }
    })

    var names = Object.keys(voldet).sort().map(n=>{ return n}).join(`\n`)

    var links = Object.keys(voldet).sort().map(n=>{

    var v = voldet[n]

      return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Sri Vaikunta Ekadashi 2023 - Volunteering*
    
Hare Krishna 🙏 Please accept the blessings of Sri Sri Krishna Balaram 🙏 We thank you for registering for the Sri Vaikunta Ekadashi services.

Please go through the following guidelines and details about your services during Vaikunta Ekadashi festival:

*Guidelines*
🪪 *ID card* for the services will be issued on *Sunday, 25th December 2022* from *9.30 AM to 11 AM* and from *6 PM to 8 PM*. ID cards can be collected from *Volunteer Info Desk* located near the Homa-Kunda area.

‼️ Please note the vehicle parking and prasadam for volunteers will be facilitated only against the ID card. Please collect your ID card without fail

🚗 Vehicle parking is not allowed inside temple. Arrangement for parking is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into parking area is allowed only against ID card

🍎 Collect *prasadam coupons* (breakfast/lunch/dinner) from Volunteer Info Desk when you report to the service

🪪 *PLEASE RETURN YOUR ID CARD TO VOLUNTEER INFO DESK WHEN YOUR SERVICES ARE COMPLETED*

1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. For any query regarding the service please call the SPOC. The contact numbers of SPOC(s) are mentioned below.

😇 Please report to your services on time. Be responsible for your services.

*Service Details:*

Name: ${v.name}
Phone: ${v.phone}

${v.services.length>1?`You have been assigned the following *${v.services.length}* services:`:`You have been assigned the following service:`}

${v.services.map(s=>{
    return `
🗓️ *Date*: ${s.date}
🛐 *Service*: ${s.service}
🕗 *Timings*: ${s.timings}
👑 *Co-ordinator*: ${s.coordinator}
🥇 *SPOC*: ${s.spoc}
📞 *SPOC's Phone number*: ${s.spocPhone}${s.spoc.trim()==v.name?`
You are the SPOC (Single-Point-of-Contact) for this service. Please meet your service coordinator ${s.coordinator} and discuss the details of the service`:``}
  `.trim()
    }).join("\n\n")
  }
  
*YOU CAN ALSO CHECK THESE SERVICE DETAILS USING THE LINK GIVEN BELOW*:
${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}

Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances. 

Regards,
Pankajanghri Dasa
ISKCON Mysore
      `.trim())}`
    }).join(`
`)
  
    linkDiv.current.textContent = links
    nameDiv.current.textContent = names
  }

  return (
    <div className='msgmain'>
      <div className='links' ref={linkDiv} contentEditable/>
      <div className='names' ref={nameDiv} contentEditable/>
    </div>
  );
}

export default Msg;
