var templates = {
    "Service Invite - Vaikunta Ekadashi": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2022-12-31",
            "2023-01-01",
            "2023-01-02"
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && v.volunteerName!="" ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && v.volunteerName!="" && !v.invMsgSent
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

        return Object.keys(voldet).sort().map(n=>{
            var v = voldet[n]
            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Sri Vaikunta Ekadashi 2023 - Volunteering*
    
Hare Krishna 🙏 Please accept the blessings of Sri Sri Krishna Balaram 🙏 We thank you for registering for the Sri Vaikunta Ekadashi services.

Please go through the following guidelines and details about your services during Vaikunta Ekadashi festival:

*Guidelines*
🪪 *ID card* for the services will be issued on *Sunday, 1st January 2023* from *9.30 AM to 11 AM* and from *6 PM to 8 PM*. ID cards can be collected from *Volunteer Info Desk* located near the Homa-Kunda area. ID cards will not be issued on festival day. So please collect on Sunday.

‼️ Please note the vehicle parking and prasadam for volunteers will be facilitated only against the ID card. Please collect your ID card without fail

🚗 Vehicle parking is not allowed inside temple. Arrangement for parking is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into parking area is allowed only against ID card

🪪 *PLEASE RETURN YOUR ID CARD TO VOLUNTEER INFO DESK WHEN YOUR SERVICES ARE COMPLETED AND COLLECT TAKE-HOME PRASADAM*

1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. Please call your SPOC and discuss the details of service, dress code etc. The contact numbers of SPOC(s) are mentioned below

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

_Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances._

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
    },
    "Service Invite - Ratha Yatra": (props)=>{

        var { volunteers } = props.data

        const vkServices = volunteers.filter((v)=>{
            return [
                "2022-12-31",
                "2023-01-01",
                "2023-01-02"
            ].indexOf(v.date)!=-1 && v.volunteerName!=""
        })
        
        const dates = [
            "2023-01-06",
            "2023-01-07",
            "2023-01-08"
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && v.volunteerName!="" ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && v.volunteerName!="" && !v.invMsgSent
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

        return Object.keys(voldet).sort().map(n=>{
            var v = voldet[n]

            var hasServiceOnVE = vkServices.filter((ss)=>{
                return ss.volunteerName==n
            }).length>0

            var hasServiceOnChurnabhisheka = volunteers.filter((ss)=>{
                return ss.volunteerName==n && ss.date=="2023-01-08"
            }).length>0

            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Ratha Yatra ${hasServiceOnChurnabhisheka?`& Churnabhisheka `:""}2023 - Volunteering*
    
Hare Krishna 🙏 Please accept the blessings of Sri Sri Krishna Balaram 🙏 We thank you for registering for the *Sri Sri Krishna Balaram Ratha Yatra* festival services.

Please go through the following guidelines and details about your services during the festival:

*Guidelines*
${hasServiceOnVE?`🪪 *ID card*: After you complete your service on Vaikunta Ekadashi day (Monday, 2nd January 2023), return your ID card of Vaikunta Ekadashi at Volunteer Info Desk and collect ID card for Ratha Yatra services`:`🪪 *ID card* for the services will be issued on *Friday, 6th January 2023* from *5 PM to 8.30 PM*. ID cards can be collected from *Volunteer Info Desk* located near the Homa-Kunda area. Note that ID cards will not be issued on festival day. So please collect it on Friday.`}

‼️ Please note the vehicle parking and prasadam for volunteers will be facilitated only against the ID card. Please collect your ID card without fail

🚗 Vehicle parking is not allowed inside temple. Arrangement for parking is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into parking area is allowed only against ID card

🪪 *PLEASE RETURN YOUR ID CARD TO VOLUNTEER INFO DESK WHEN YOUR SERVICES ARE COMPLETED AND COLLECT TAKE-HOME PRASADAM*

1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. Please call your SPOC and discuss the details of service, dress code etc. The contact numbers of SPOC(s) are mentioned below.

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

_Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances._

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
    },
    "SPOC Info": (props)=>{

        var { services } = props.data
        const dates = [
            "2022-12-31",
            "2023-01-01",
            "2023-01-02"
        ]

        services = services.filter(s=>{
        return dates.indexOf(s.date)!=-1
        })

        var spocMap = {}

        services.map(s=>{
        if(s.coordinator==s.spoc){
            return
        }

        spocMap[s.spoc]=spocMap[s.spoc]||{
            spoc: s.spoc,
            spocPhone: s.spocPhone,
            services : []
        }
        spocMap[s.spoc].services.indexOf(s.service)==-1 && spocMap[s.spoc].services.push({
                service: s.serviceName,
                date: s.date
            })
        })

        var spocs = Object.keys(spocMap).sort()

        return spocs.map(sp=>{
        var s = spocMap[sp]

      return `https://web.whatsapp.com/send?phone=91${s.spocPhone}&name=${encodeURIComponent(s.spoc)}&text=${encodeURIComponent(`
*SPOC for Sri Vaikunta Ekadashi 2023 services*

Hare Krishna 🙏. You are assigned as Single-Point-of-Contact (SPOC) for ${s.services.length>1?`following *${s.services.length}* services:

${s.services.map(sv=>{ return ` • ${sv.service} (${sv.date})`}).join(`
`)}`:`${s.services[0].service} service.`}

Please use this link to check the details of the service${s.services.length>1?`s`:``}:
https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}

Regards,
Pankajanghri Dasa
ISKCON Mysore
`.trim())}`})
    }
}

export default templates