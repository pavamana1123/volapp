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
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.invMsgSent
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
${hasServiceOnVE?`🪪 *ID card*: After you complete your service on Vaikunta Ekadashi day (Monday, 2nd January 2023), return your ID card of Vaikunta Ekadashi at Volunteer Info Desk and collect ID card for Ratha Yatra services`:`🪪 *ID card* for the services will be issued on *Friday, 6th January 2023* from *5 PM to 9 PM*. ID cards can be collected from *Volunteer Info Desk* located near the Homa-Kunda area. Note that ID cards will not be issued on festival day. So please collect it on Friday.`}

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
    "SPOC Info - Ratha Yatra": (props)=>{

        var { services } = props.data
        const dates = [
            "2023-01-06",
            "2023-01-07",
            "2023-01-08"
        ]

        services = services.filter(s=>{
            return dates.indexOf(s.date)!=-1
        })

        var spocMap = {}

        services.map(s=>{
            if(s.coordinator==s.spoc || s.spoc=="" || s.spocPhone==""){
                return
            }

            spocMap[s.spoc]=spocMap[s.spoc]||{
                spoc: s.spoc,
                spocPhone: s.spocPhone,
                coordinator: s.coordinator,
                coordinatorPhone: s.coordinatorPhone,
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
*SPOC for Ratha Yatra 2023 services*

Hare Krishna 🙏. You are assigned as Single-Point-of-Contact (SPOC) for ${s.services.length>1?`following *${s.services.length}* services:

${s.services.map(sv=>{ return ` • ${sv.service} (${sv.date})`}).join(`
`)}`:`${s.services[0].service} service.`}

Please use this link to check the details of the service${s.services.length>1?`s`:``}:
https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}

Your service coordinator is ${s.coordinator} (${s.coordinatorPhone}). Please get in touch with your coordinator and discuss the details of the service.

Regards,
Pankajanghri Dasa
ISKCON Mysore
`.trim())}`})
    },
    "Service Reminder - Vaikunta Ekadashi": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-01-02"
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.serviceReminderSent){
                umap[v.volunteerName]=v.volunteerPhone
                return true
            }
            return false
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
                    spocPhone: volunteers[i].spocPhone,
                    serviceDuration: volunteers[i].serviceDuration
                })
            }
            }
        })

        Object.keys(umap).map(name=>{
            voldet[name].majorService = voldet[name].services.sort((a,b)=>{
                return b.serviceDuration-a.serviceDuration
            })[0]
        })

        return Object.keys(voldet).sort().map(n=>{
            var v = voldet[n]
            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Gentle Reminder - Sri Vaikunta Ekadashi 2023 Volunteering*

Hare Krishna 🙏
    
Hope you have got in touch with your service SPOC and are ready for volunteer services tomorrow.

*Please carefully note the following guidelines*

🆔 Please bring your volunteer ID card without fail

🚗 Vehicle parking is not allowed inside the temple. Arrangement for parking is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into the parking area is allowed only against Volunteer ID Card

🪪 PLEASE RETURN YOUR ID CARD AT THE VOLUNTEER INFO DESK WHEN YOUR SERVICES ARE COMPLETED AND COLLECT TAKE-HOME PRASADAM. You can also collect *Ratha Yatra ID card* after returning this card.

*IMPORTANT:*
Please collect *Prasadam Coupons* for breakfast, lunch & dinner prasadam from your SPOC *${v.majorService.spoc} (${v.majorService.spocPhone})*. Prasadam will be served only against the prasadam coupon. ${v.services.length>1?`Although you have multiple services (and SPOCs), please collect your prasadam coupons from the above mentioned SPOC only.`:``}

Here is your service details, once again for your reference.

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
📞 *SPOC's Phone number*: ${s.spocPhone}`.trim()
    }).join("\n\n")
    }
    
*YOU CAN ALSO CHECK THESE SERVICE DETAILS USING THE LINK GIVEN BELOW*:
${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
    },
    "Service Reminder - Ratha Yatra": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-01-07"
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.serviceReminderSent){
                umap[v.volunteerName]=v.volunteerPhone
                return true
            }
            return false
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
                    spocPhone: volunteers[i].spocPhone,
                    serviceDuration: volunteers[i].serviceDuration
                })
            }
            }
        })

        Object.keys(umap).map(name=>{
            voldet[name].majorService = voldet[name].services.sort((a,b)=>{
                return b.serviceDuration-a.serviceDuration
            })[0]
        })

        return Object.keys(voldet).sort().map(n=>{
            var v = voldet[n]
            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Gentle Reminder - Ratha Yatra 2023 Volunteering*

Hare Krishna 🙏
    
Hope you have got in touch with your service SPOC and are ready for volunteer services tomorrow.

*Please carefully note the following guidelines*

🆔 Please bring your volunteer ID card without fail

🚗 Vehicle parking is not allowed inside the temple. Arrangement for parking is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into the parking area is allowed only against Volunteer ID Card

🪪 PLEASE RETURN YOUR ID CARD AT THE _VOLUNTEER INFO DESK_ WHEN YOUR SERVICES ARE COMPLETED AND COLLECT TAKE-HOME PRASADAM. Volunteer Info desk will be located near the temple entrance.

*IMPORTANT:*
Please collect *Prasadam Coupons* for breakfast, lunch & dinner prasadam from your SPOC *${v.majorService.spoc} (${v.majorService.spocPhone})*. Prasadam will be served only against the prasadam coupon. ${v.services.length>1?`Although you have multiple services (and SPOCs), please collect your prasadam coupons from the above mentioned SPOC only.`:``}

Here is your service details, once again for your reference.

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
📞 *SPOC's Phone number*: ${s.spocPhone}`.trim()
    }).join("\n\n")
    }
    
*YOU CAN ALSO CHECK THESE SERVICE DETAILS USING THE LINK GIVEN BELOW*:
${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
    },
    "Prasadam Coupons - Ratha Yatra": (props)=>{
        var { volunteers, slots } = props.data

        const slotMap = {}
        slots.map(s=>{
            slotMap[s.slot]=s
        })

        const dates = [
            "2023-01-07"
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && v.coordinator!=v.spoc){
                umap[v.volunteerName]=v.volunteerPhone
                return true
            }
            return false
        })
        
        Object.keys(umap).map(name=>{
            for(var i=0; i<volunteers.length; i++){
            if(volunteers[i].volunteerName==name){
                if(!voldet[name]){
                voldet[name]={
                    name,
                    phone: volunteers[i].volunteerPhone,
                    b: !!(slotMap[volunteers[i].availability]||{}).b,
                    l: !!(slotMap[volunteers[i].availability]||{}).l,
                    d: !!(slotMap[volunteers[i].availability]||{}).d,
                    services:[]
                }
                }
                voldet[name].services.push({
                    date: volunteers[i].date,
                    service: volunteers[i].service,
                    timings: volunteers[i].timings,
                    coordinator: volunteers[i].coordinator,
                    spoc: volunteers[i].spoc,
                    spocPhone: volunteers[i].spocPhone,
                    serviceDuration: volunteers[i].serviceDuration,
                })
            }
            }
        })

        Object.keys(umap).map(name=>{
            voldet[name].majorService = voldet[name].services.sort((a,b)=>{
                return b.serviceDuration-a.serviceDuration
            })[0]
        })

        var spocMap = {}

        Object.keys(voldet).sort().map(n=>{
            var v = voldet[n]
            if(v.majorService.spoc=="" || v.majorService.spocPhone==""){
                return
            }
            if(!spocMap[v.majorService.spoc]){
                spocMap[v.majorService.spoc]={
                    spoc: v.majorService.spoc,
                    spocPhone: v.majorService.spocPhone,
                    volunteers: {},
                }
            }
            if(!spocMap[v.majorService.spoc].volunteers[v.name]){
                spocMap[v.majorService.spoc].volunteers[v.name]=v
            }
        })

        return Object.keys(spocMap).sort().map(n=>{
            var s = spocMap[n]
            return `https://web.whatsapp.com/send?phone=91${s.spocPhone}&name=${encodeURIComponent(s.spoc)}&text=${encodeURIComponent(`
*SPOC Prasadam Coupons - Ratha Yatra*

Hare Krishna 🙏 Kind attention SPOC!

You must collect prasadam coupons (breakfast, lunch & dinner) for the volunteers in your services. These prasadam coupons are to be used on 7th Jan.

Prasadam coupons will be distributed on *Friday, 6th Jan from 5 PM to 9 PM* at the Volunteer Info Desk near Homa Kunda area.

Please note that the number of prasadam coupons given to you is a close approximation. If you fall short of coupons, please collect the balance from Volunteer Info Desk. For any query call 9844675891 or 6364903722

Below is the list of volunteers to whom you have to handover breakfast, lunch and dinner coupons:

*Breakfast:*
${Object.keys(s.volunteers).map(vv=>{
    return s.volunteers[vv]
}).filter(vv=>{
    return vv.b
}).map((vv,i)=>{
    return `${i+1}. ${vv.name}`
}).join(`
`)}

*Lunch:*
${Object.keys(s.volunteers).map(vv=>{
    return s.volunteers[vv]
}).filter(vv=>{
    return vv.l
}).map((vv,i)=>{
    return `${i+1}. ${vv.name}`
}).join(`
`)}

*Dinner:*
${Object.keys(s.volunteers).map(vv=>{
    return s.volunteers[vv]
}).filter(vv=>{
    return vv.d
}).map((vv,i)=>{
    return `${i+1}. ${vv.name}`
}).join(`
`)}

Recheck the services for which you are SPOC with the link below:
https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(n)}

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`
        })
    },
    "ID Card Reminder - Ratha Yatra": (props)=>{
        var { volunteers } = props.data
        
        const dates = [
            "2023-01-07",
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.idCardCollected){
                umap[v.volunteerName]=v.volunteerPhone
                return true
            }
            return false
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

            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`🪪 *Reminder to collect ID Card for Ratha Yatra Volunteering*

Hare Krishna 🙏
Your volunteer ID card for Ratha Yatra service will be issued *today (Friday 6th January 2023) from 5 PM to 9 PM* at Volunteer Info Desk near Homa Kunda area.

Please collect the ID cards without fail today. ID cards will *NOT* be issued tomorrow.

‼️ IMPORTANT NOTE: Please re-check your service using the below link before the festival. Sometimes your service may change due to unavoidable circumstances.
https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}

Please get in touch with your service SPOC and understand the service's details.

Regards,
Pankajanghri Dasa
ISKCON Mysore`)}`
        })
    }
}

export default templates