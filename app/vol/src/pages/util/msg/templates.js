import moment from 'moment'

var templates = {
    "Service Info - Vaikunta Ekadashi": (props)=>{

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
            return dates.indexOf(v.date)!=-1 && v.volunteerName!="" && !v.infoMsgSent
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
    
Hare Krishna 🙏 Please accept the blessings of Sri Sri Krishna Balarama 🙏 We thank you for registering for the Sri Vaikunta Ekadashi services.

Please go through the following guidelines and details about your services during Vaikunta Ekadashi festival:

*Guidelines*
🪪 *ID card* for the services will be issued on *Sunday, 1st January 2023* from *9.30 AM to 11 AM* and from *6 PM to 8 PM*. ID cards can be collected from *Volunteer Info Desk* located near the Homa-Kunda area. ID cards will not be issued on festival day. So please collect on Sunday.

‼️ Please note the vehicle parking and prasadam for volunteers will be facilitated only against the ID card. Please collect your ID card without fail

🚗 Vehicle parking is not allowed inside temple. Arrangement for parking is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into parking area is allowed only against ID card

🪪 *PLEASE RETURN YOUR ID CARD TO VOLUNTEER INFO DESK WHEN YOUR SERVICES ARE COMPLETED AND COLLECT TAKE-HOME PRASADAM*

1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. *Please call your SPOC and discuss the details of service*, dress code etc. The contact numbers of SPOC(s) are mentioned below

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

    "Service Info - Ratha Yatra": (props)=>{

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
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.infoMsgSent
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
    
Hare Krishna 🙏 Please accept the blessings of Sri Sri Krishna Balarama 🙏 We thank you for registering for the *Sri Sri Krishna Balarama Ratha Yatra* festival services.

Please go through the following guidelines and details about your services during the festival:

*Guidelines*
${hasServiceOnVE?`🪪 *ID card*: After you complete your service on Vaikunta Ekadashi day (Monday, 2nd January 2023), return your ID card of Vaikunta Ekadashi at Volunteer Info Desk and collect ID card for Ratha Yatra services`:`🪪 *ID card* for the services will be issued on *Friday, 6th January 2023* from *5 PM to 9 PM*. ID cards can be collected from *Volunteer Info Desk* located near the Homa-Kunda area. Note that ID cards will not be issued on festival day. So please collect it on Friday.`}

‼️ Please note the vehicle parking and prasadam for volunteers will be facilitated only against the ID card. Please collect your ID card without fail

🚗 Vehicle parking is not allowed inside temple. Arrangement for parking is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into parking area is allowed only against ID card

🪪 *PLEASE RETURN YOUR ID CARD TO VOLUNTEER INFO DESK WHEN YOUR SERVICES ARE COMPLETED AND COLLECT TAKE-HOME PRASADAM*

1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. *Please call your SPOC and discuss the details of service*, dress code etc. The contact numbers of SPOC(s) are mentioned below.

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

🚗 Vehicle parking is not allowed inside the temple. You need to park outside.

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
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.idCardCollected && !v.idReminderSent){
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
    },
    
    "Service Info - Gaura Purnima": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-03-07",
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.infoMsgSent
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
*Sri Gaura Purnima 2023 - Volunteering*
*Tuesday, 7th March 2023*
   
Hare Krishna 🙏 Please accept the blessings of Sri Sri Krishna Balarama 🙏 We thank you for registering for the *Sri Gaura Purnima* festival services.

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

*Note:*
1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. *Please call your SPOC and discuss the details of service*, dress code etc. The contact numbers of SPOC(s) are mentioned below.
😇 Please report to your services on time. Be responsible for your services.

_Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances._

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
    },

    "SPOC Info - Gaura Purnima": (props)=>{

        var { services } = props.data
        const dates = [
            "2023-03-07"
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
*SPOC for Sri Gaura Purnima 2023 services*
*Tuesday, 7th March 2023*

Hare Krishna 🙏. You are assigned as Single-Point-of-Contact (SPOC) for ${s.services.length>1?`following *${s.services.length}* services:

${s.services.map(sv=>{ return ` • *${sv.service}*`}).join(`
`)}`:`*${s.services[0].service}* service.`}

Please use this link to check the details of the service${s.services.length>1?`s`:``}:
*https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}*

Your service coordinator is ${s.coordinator}. Please get in touch with your coordinator and discuss the details of the service.

Regards,
Pankajanghri Dasa
ISKCON Mysore
`.trim())}`})
    },

    "Service Info - Rama Navami": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-03-29",
            "2023-03-30"
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.infoMsgSent
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
*Sri Rama Navami 2023 - Volunteering*
*Thursday, 30th March 2023*
   
Hare Krishna 🙏 Please accept the blessings of Sri Sri Krishna Balarama 🙏 We thank you for registering for the *Sri Rama Navami* festival services.

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

*Note:*
1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. *Please call your SPOC and discuss the details of service*, dress code etc. The contact numbers of SPOC(s) are mentioned below.
😇 Please report to your services on time. Be responsible for your services.

_Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances._

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
    },

    "SPOC Info - Rama Navami": (props)=>{

        var { services } = props.data
        const dates = [
            "2023-03-30"
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
*SPOC for Sri Rama Navami 2023 services*
*Thursday, 30th March 2023*

Hare Krishna 🙏. You are assigned as Single-Point-of-Contact (SPOC) for ${s.services.length>1?`following *${s.services.length}* services:

${s.services.map(sv=>{ return ` • *${sv.service}*`}).join(`
`)}`:`*${s.services[0].service}* service.`}

Please use this link to check the details of the service${s.services.length>1?`s`:``}:
*https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}*

Your service coordinator is ${s.coordinator}. Please get in touch with your coordinator and discuss the details of the service.

Regards,
Pankajanghri Dasa
ISKCON Mysore
`.trim())}`})
    },

    "Service Reminder - Rama Navami": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-03-29",
            "2023-03-30"
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
*Gentle Reminder - Sri Rama Navami 2023 Volunteering*

Hare Krishna 🙏
    
Hope you have got in touch with your service SPOC and are ready for volunteer services.

Here is your service details, once again for your reference:

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

    "SPOC Info - Narasimha Chaturdashi": (props)=>{

        var { services } = props.data
        const dates = [
            "2023-05-03",
            "2023-05-04",
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
                services : []
            }
            spocMap[s.spoc].services.indexOf(s.service)==-1 && spocMap[s.spoc].services.push({
                    service: s.serviceName,
                    date: s.date,
                    coordinator: s.coordinator,
                    coordinatorPhone: s.coordinatorPhone,
                    timings: s.timings,
                    requirement: s.requirement,
                })
        })

        var spocs = Object.keys(spocMap).sort()

        return spocs.map(sp=>{
        var s = spocMap[sp]

      return `https://web.whatsapp.com/send?phone=91${s.spocPhone}&name=${encodeURIComponent(s.spoc)}&text=${encodeURIComponent(`
*SPOC for Sri Narasimha Chaturdashi 2023 services*
*Thursday, 4th May 2023*

Hare Krishna 🙏. You are assigned as Single-Point-of-Contact (SPOC) for below mentioned ${s.services.length>1?s.services.length:""} service${s.services.length>1?"s":""}. Kindly go through the details of the service${s.services.length>1?"s":""} carefully:

Name: ${s.spoc}
Phone: ${s.spocPhone}

${s.services.map(sv=>{
    return `
🗓️ Date: *${moment(sv.date, "YYYY-MM-DD").format("dddd, Do MMMM")}*
🛐 Service: *${sv.service}*
🕗 Timings: *${sv.timings}*
👑 Coordinator: *${sv.coordinator}*
📞 Coordinator's Phone: *${sv.coordinatorPhone}*
#️⃣ No. of volunteers: *${sv.requirement}*
`.trim()
}).join(`

`)}

Please use this link to check the details of the service${s.services.length>1?"s":""} and volunteers under you:
*https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}*

Your responsibilities:
 • Please discuss with the service coordinator${s.services.length>1?"s":""} and understand all major and minor details of the service like dress code, timings etc.
 • Please call volunteers under you and communicate all the details of the service to them. Phone numbers of all volunteers is availbale in the link shared above.
 • Make sure that volunteers report at proper time and in appropriate dress code for their service.

Regards,
Pankajanghri Dasa
ISKCON Mysore
`.trim())}`})
    },

    "Service Info - Narasimha Chaturdashi": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-05-03",
            "2023-05-04",
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.infoMsgSent
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
                availability: volunteers[i].availability,
                })
            }
            }
        })


        return Object.keys(voldet).sort().map(n=>{
            var v = voldet[n]
            var isDefault = !!v.services.filter(sss=>{ return (sss.availability=="Default" || sss.availability=="NOT AVAILABLE") }).length

            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Sri Narasimha Chaturdashi 2023 - Volunteering*
*Thursday, 30th March 2023*
   
Hare Krishna 🙏 Please accept the blessings of Sri Sri Krishna Balarama 🙏 ${isDefault ? "" : "We thank you for registering for the Sri Narasimha Chaturdashi festival services"}.

*Service Details:*

Name: ${v.name}
Phone: ${v.phone}

${v.services.length>1?`You have been assigned the following *${v.services.length}* services:`:`You have been assigned the following service:`}

${v.services.map(s=>{
    return `
🗓️ Date: *${moment(s.date, "YYYY-MM-DD").format("dddd, Do MMMM")}*
🛐 Service: *${s.service}*
🕗 Timings: *${s.timings}*
👑 Co-ordinator: *${s.coordinator}*
🥇 SPOC: *${s.spoc}*
📞 SPOC's Phone number: *${s.spocPhone}*${s.spoc.trim()==v.name?`
You are the SPOC (Single-Point-of-Contact) for this service.`:``}
    `.trim()
    }).join("\n\n")
    }
    
*YOU CAN ALSO CHECK THESE SERVICE DETAILS USING THE LINK GIVEN BELOW*:
${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}

*Note:*
1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. *Please call your SPOC and discuss the details of service* like dress code, timings etc. The contact numbers of SPOC(s) are mentioned above.
😇 Please report to your services on time. Be responsible for your services.
🌐 If you are not able click and open the above link, it may likely be because you have not stored this number. Please save this number as 'ISKCON Mysore'.

_Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances._

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
    },

    "Service Reminder - Narasimha Chaturdashi": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-05-03",
            "2023-05-04",
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
*Gentle Reminder - Sri Narasimha Chaturdashi 2023 Volunteering*

Hare Krishna 🙏
    
Hope you have got in touch with your service SPOC and are ready for volunteer services.

Here is your service details, once again for your reference:

*Service Details:*

Name: ${v.name}
Phone: ${v.phone}

${v.services.length>1?`You have been assigned the following *${v.services.length}* services:`:`You have been assigned the following service:`}

${v.services.map(s=>{
    return `
🗓️ Date: *${moment(s.date, "YYYY-MM-DD").format("dddd, Do MMMM")}*
🛐 Service: *${s.service}*
🕗 Timings: *${s.timings}*
👑 Co-ordinator: *${s.coordinator}*
🥇 SPOC: *${s.spoc}*
📞 SPOC's Phone number: *${s.spocPhone}*${s.spoc.trim()==v.name?`
You are the SPOC (Single-Point-of-Contact) for this service.`:``}
    `.trim()
    }).join("\n\n")
    }
    
*YOU CAN ALSO CHECK THESE SERVICE DETAILS USING THE LINK GIVEN BELOW*:
${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
    },

    "Service Info - SBJ-SKJ-SVP": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-08-30",
            "2023-08-31",
            "2023-09-05",
            "2023-09-06",
            "2023-09-07",
            "2023-09-08",
            "2023-09-09"
        ]

        const sbjdates = [
            "2023-08-30",
            "2023-08-31"
        ]

        const skjdates = [
            "2023-09-05",
            "2023-09-06",
            "2023-09-07",
            "2023-09-09"
        ]

        
        const couponDates = [
            "2023-09-06",
            "2023-09-07",
        ]

        const svpdates = [
            "2023-09-08"
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="" && v.service!="") && !v.infoMsgSent){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="" && v.service!="") && !v.infoMsgSent
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
                        availability: volunteers[i].availability,
                        serviceDuration: volunteers[i].serviceDuration
                    })
                }
            }
        })


        return Object.keys(voldet).sort().map(n=>{
            var v = voldet[n]
            var isDefault = !!v.services.filter(sss=>{ return (sss.availability=="Default" || sss.availability=="NOT AVAILABLE") }).length

            var vDateMap = {}
            v.services.forEach(vv => {
                vDateMap[vv.date]=1
            })

            var vDates = Object.keys(vDateMap).sort()

            var isInSBJ = sbjdates.some(e=>{ return vDates.includes(e) })
            var isInSKJ = skjdates.some(e=>{ return vDates.includes(e) })
            var isInOnlySKJ = couponDates.some(e=>{ return vDates.includes(e) })
            var isInSVP = svpdates.some(e=>{ return vDates.includes(e) })

            var fests = []
            if(isInSBJ) fests.push("Sri Balarama Jayanthi")
            if(isInSKJ) fests.push("Sri Krishna Janmashtami")
            if(isInSVP) fests.push("Sri Vyasa Puja")
            var festivals = fests.join(", ").replaceLastOccurance(", ", " & ")

            var mainService6 = (v.services.filter(vv=>{
                return vv.date=="2023-09-06"
            }).sort((vv1, vv2)=>{
                return vv2.serviceDuration-vv1.serviceDuration
            })[0])||{}

            var mainService7 = (v.services.filter(vv=>{
                return vv.date=="2023-09-07"
            }).sort((vv1, vv2)=>{
                return vv2.serviceDuration-vv1.serviceDuration
            })[0])||{}

            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Volunteering Info - ${festivals}*
   
Hare Krishna 🙏 Please accept the blessings of Sri Sri Krishna Balarama 🙏 ${isDefault ? "" : `We thank you for registering for volunteer services for ${festivals} festival${fests.length>1?"s":""}`}.

*☝🏻 Before you go through this message, please save this number in your phone. If you don't, you may not be able to click and open important links given in this message!*

*General Guidelines:*

1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. *Please contact SPOC(s) of your service(s) and discuss the details of service like timings, dress code etc. The contact numbers of SPOC(s) are mentioned below.

${isInOnlySKJ?`🪪 *Volunteer Badge (ID card)* will be issued on Sunday, 5th September 2023 near Sridham Hall from 2 PM to 8 PM. This badge is necessary and valid only for Janmashtami festival on 6th and 7th Sep.

🚗 Vehicle parking is not allowed inside temple. Arrangement for parking is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into parking area is allowed only against ID card

➡️ Volunteer entry is through temple main gate (Gate 1).

🎫 Breakfast, lunch and dinner prasadam will be provided to you against prasadam coupons by SPOC. The details of the SPOC who will issue you coupons can be found in the link given at the end of this message.

🪪 *PLEASE RETURN YOUR ID CARD TO VOLUNTEER CARE CELL WHEN YOUR SERVICES ARE COMPLETED AND COLLECT TAKE-HOME PRASADAM*

🏃 Inform SPOC before you leave (particularly if you are leaving the service in middle due an emergency)

`:""}😇 Please report to your services on time. Be responsible for your services.

*Service Details:*

Your Name: ${v.name}
Phone: ${v.phone}

${v.services.length>1?`You have been assigned the following *${v.services.length}* services:`:`You have been assigned the following service:`}

${v.services.map(s=>{
    return `
🗓️ Date: *${moment(s.date, "YYYY-MM-DD").format("dddd, Do MMMM")}*
🛐 Service: *${s.service}*
🕗 Timings: *${s.timings.toTimingCase()}*${!(s.availability=="Default" || s.availability=="NOT AVAILABLE" || s.availability=="Whole Day")?`
🕗 Your slot: *${s.availability}*`:""}
👑 Co-ordinator: *${s.coordinator}*
🥇 SPOC: *${s.spoc}*
📞 SPOC's Phone number: *${s.spocPhone}*${s.spoc.trim()==v.name?`
You are the SPOC (Single-Point-of-Contact) for this service.`:``}
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

    "Service Reminder - SBJ": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-08-30",
            "2023-08-31",
        ]

        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="" && v.service!="")){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="" && v.service!="")
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
                        availability: volunteers[i].availability,
                        serviceDuration: volunteers[i].serviceDuration
                    })
                }
            }
        })


        return Object.keys(voldet).sort().map(n=>{
            var v = voldet[n]
            var isDefault = !!v.services.filter(sss=>{ return (sss.availability=="Default" || sss.availability=="NOT AVAILABLE") }).length

            var vDateMap = {}
            v.services.forEach(vv => {
                vDateMap[vv.date]=1
            })

            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Gentle Reminder - Sri Balarama Purnima Volunteering Service*
*Thursday, 31st August 2023*

Hare Krishna 🙏

Given below is the details of your service, provided once again for your reference:

*Service Details:*

Your Name: ${v.name}
Phone: ${v.phone}

${v.services.length>1?`You have been assigned the following *${v.services.length}* services:`:`You have been assigned the following service:`}

${v.services.map(s=>{
    return `
🗓️ Date: *${moment(s.date, "YYYY-MM-DD").format("dddd, Do MMMM")}*
🛐 Service: *${s.service}*
🕗 Timings: *${s.timings.toTimingCase()}*${!(s.availability=="Default" || s.availability=="NOT AVAILABLE" || s.availability=="Whole Day")?`
🕗 Your slot: *${s.availability}*`:""}
👑 Co-ordinator: *${s.coordinator}*
🥇 SPOC: *${s.spoc}*
📞 SPOC's Phone number: *${s.spocPhone}*${s.spoc.trim()==v.name?`
You are the SPOC (Single-Point-of-Contact) for this service.`:``}
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

    "SPOC Info - SBJ-SKJ-SVP": (props)=>{

        var { services } = props.data
        const dates = [
            "2023-08-30",
            "2023-08-31",
            "2023-09-05",
            "2023-09-06",
            "2023-09-07",
            "2023-09-08",
            "2023-09-09"
        ]

        services = services.filter(s=>{
            return dates.indexOf(s.date)!=-1
        })  

        var spocMap = {}

        services.map(s=>{
            if(s.spoc=="" || s.spocPhone==""){
                return
            }

            spocMap[s.spoc]=spocMap[s.spoc]||{
                spoc: s.spoc,
                spocPhone: s.spocPhone,
                services : []
            }
            spocMap[s.spoc].services.indexOf(s.service)==-1 && spocMap[s.spoc].services.push({
                    service: s.serviceName,
                    date: s.date,
                    coordinator: s.coordinator,
                    coordinatorPhone: s.coordinatorPhone,
                    timings: s.timings,
                    requirement: s.requirement,
                })
        })

        var spocs = Object.keys(spocMap).sort()

        return spocs.map(sp=>{
        var s = spocMap[sp]

      return `https://web.whatsapp.com/send?phone=91${s.spocPhone}&name=${encodeURIComponent(s.spoc)}&text=${encodeURIComponent(`
*SPOC for Volunteering Services*

Hare Krishna 🙏. You are assigned as Single-Point-of-Contact (SPOC) for below mentioned ${s.services.length>1?s.services.length:""} service${s.services.length>1?"s":""}. Kindly go through the details of the service${s.services.length>1?"s":""} carefully:

Name: ${s.spoc}
Phone: ${s.spocPhone}

${s.services.map(sv=>{
    return `
🗓️ Date: *${moment(sv.date, "YYYY-MM-DD").format("dddd, Do MMMM")}*
🛐 Service: *${sv.service}*
🕗 Timings: *${sv.timings.toTimingCase()}*
👑 Coordinator: *${sv.coordinator}*
📞 Coordinator's Phone: *${sv.coordinatorPhone}*
#️⃣ No. of volunteers: *${sv.requirement}*
`.trim()
}).join(`

`)}

Please use this link to check the details of the service${s.services.length>1?"s":""} and volunteers under you:
*https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}*

Responsibilities of SPOC:
1️⃣ SPOC must understand all the details of the service, timings, dress-code etc. from the co-ordinator.

2️⃣ SPOC must communicate and orient the volunteers regarding all aspects of the service. The contact details of the volunteers are provided in the link given above.

3️⃣ SPOC must make sure that volunteers report at proper time and in appropriate dress code for their service.

4️⃣ SPOC must collect Prasadam Coupons from Volunteer Care Cell and issue them volunteers on the previous day of service. Prasadam Coupons are meant to be used only on 6th and 7th September. Not on other days. You can find the list of volunteers to whom you must issue the coupons by clicking on "Prasadam Coupons" button after opening the link given above.

Regards,
Pankajanghri Dasa
ISKCON Mysore
`.trim())}`})
    },

    "Volunteer Badge Info - SKJ": (props)=>{
    var { volunteers } = props.data
    
    const dates = [
        "2023-09-06",
        "2023-09-07"
    ]
    
    var umap = {}
    var voldet = {}

    var volunteers = volunteers.filter(v=>{
        if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.idCardCollected && !v.idReminderSent){
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

        return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`🪪 *Volunteer Badge (ID Card) for Sri Krishna Janmashtami Volunteering*

Hare Krishna 🙏
Your volunteer badge will be issued *tomorrow (Sunday, 3rd September 2023)* in *Sridham Hall* from *9.30 AM to 11 AM and 5 PM to 7 PM.* Please collect the badge without fail. This badge is necessary and valid only for Janmashtami festival on 6th and 7th Sep.

Note:
1) Volunteer badge is necessary for your vehicle parking also. Vehicle parking is not allowed inside temple on 6th and 7th September. Arrangement for parking is made in _Pailvan Basavayya Community Hall_ in front of the temple. Parking can be availed against the Volunteer Badge.

2) Please return your volunteer badge to volunteer care cell when your services are completed (on 6th or 7th, as applicable to you) and collect take-home prasadam.

If you have any queries regarding issuing of Volunteer Badges, please reply here.

Regards,
Pankajanghri Dasa
ISKCON Mysore`)}`
    })
    },

    "Volunteer Badge Return Reminder - SKJ": (props)=>{
        var { volunteers } = props.data
        
        const dates = [
            "2023-09-06",
            "2023-09-07"
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && v.idCardCollected && !v.idCardReturned){
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
    
            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`Gentle reminder to *return* your volunteer badge before Friday, 15th September 2023 at temple book counter.
Hare Krishna.`)}`
        })
        },


        "Volunteer Badge Reminder - SKJ": (props)=>{
            var { volunteers } = props.data
            
            const dates = [
                "2023-09-06",
                "2023-09-07"
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
        
                return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`Gentle reminder to collect your volunteer badge today.
                
    Time: 2 PM to 8 PM.
    Venue: Volunteer Care Cell near Sridham Hall
    
    Hare Krishna.`)}`
            })
            },        
        
        "Service Info - Sri Radhashtami": (props)=>{

            var { volunteers } = props.data
            
            const dates = [
                "2023-09-23",
            ]
            
            var umap = {}
            var voldet = {}
        
            var volunteers = volunteers.filter(v=>{
                if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                    umap[v.volunteerName]=v.volunteerPhone
                }
                return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.infoMsgSent
            })
            
            Object.keys(umap).map(name=>{
                for(var i=0; i<volunteers.length; i++){
                if(volunteers[i].volunteerName==name){
                    if(!voldet[name]){
                    voldet[name]={
                        name,
                        phone: volunteers[i].volunteerPhone,
                        availability: volunteers[i].availability,
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

                console.log(v)
    
                return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Sri Radhashtami 2023 - Volunteering*
*Saturday, 23rd September 2023*
       
Hare Krishna 🙏
Please accept the blessings of Sri Sri Krishna Balarama 🙏 ${v.availability!="Default"?"We thank you for registering for the *Sri Radhashtami* festival services.":""}

*Service Details:*
    
Your Name: ${v.name}
Phone: ${v.phone}
    
${v.services.length>1?`You have been assigned the following *${v.services.length}* services:`:`You have been assigned the following service:`}
    
${v.services.map(s=>{
    return `
🗓️ *Date*: ${s.date}
🛐 *Service*: ${s.service}
🕗 *Timings*: ${s.timings.toTimingCase()}
👑 *Co-ordinator*: ${s.coordinator}
🥇 *SPOC*: ${s.spoc}
📞 *SPOC's Phone number*: ${s.spocPhone}${s.spoc.trim()==v.name?`

You are the SPOC (Single-Point-of-Contact) for this service. Please meet your service coordinator ${s.coordinator} and discuss the details of the service`:``}
        `.trim()
        }).join("\n\n")
        }
        
*YOU CAN ALSO CHECK THESE SERVICE DETAILS USING THE LINK GIVEN BELOW*:
${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}

*Note:*
1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. *Please call your SPOC and discuss the details of service*, dress code etc. The contact numbers of SPOC(s) are mentioned below.
😇 Please report to your services on time. Be responsible for your services.

_Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances._

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
        },

        "SPOC Info - Sri Radhastami": (props)=>{

            var { services } = props.data
            const dates = [
                "2023-09-23",
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
                    services : []
                }
                spocMap[s.spoc].services.indexOf(s.service)==-1 && spocMap[s.spoc].services.push({
                        service: s.serviceName,
                        date: s.date,
                        coordinator: s.coordinator,
                        coordinatorPhone: s.coordinatorPhone,
                        timings: s.timings,
                        supply: s.supply,
                    })
            })
    
            var spocs = Object.keys(spocMap).sort()
    
            return spocs.map(sp=>{
            var s = spocMap[sp]
    
          return `https://web.whatsapp.com/send?phone=91${s.spocPhone}&name=${encodeURIComponent(s.spoc)}&text=${encodeURIComponent(`
*SPOC for Sri Radhashtami 2023 services*
*Saturday, 23rd September 2023*

Hare Krishna 🙏. You are assigned as Single-Point-of-Contact (SPOC) for below mentioned ${s.services.length>1?s.services.length:""} service${s.services.length>1?"s":""}. Kindly go through the details of the service${s.services.length>1?"s":""} carefully:

Your Name: ${s.spoc}
Phone: ${s.spocPhone}

${s.services.map(sv=>{
    return `
🗓️ Date: *${moment(sv.date, "YYYY-MM-DD").format("dddd, Do MMMM")}*
🛐 Service: *${sv.service}*
🕗 Timings: *${sv.timings.toTimingCase()}*
👑 Coordinator: *${sv.coordinator}*
📞 Coordinator's Phone: *${sv.coordinatorPhone}*
#️⃣ No. of volunteers: *${sv.supply}*
`.trim()
}).join(`

`)}

Please use this link to check the details of the service${s.services.length>1?"s":""} and volunteers under you:
*https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}*

Your responsibilities:
    • Please discuss with the service coordinator${s.services.length>1?"s":""} and understand all major and minor details of the service like dress code, timings etc.
    • Please call volunteers under you and communicate all the details of the service to them. Phone numbers of all volunteers is availbale in the link shared above.
    • Make sure that volunteers report at proper time and in appropriate dress code for their service.

Regards,
Pankajanghri Dasa
ISKCON Mysore
    `.trim())}`})
        },         
    
    
    "Service Info - ISKCON Dasara": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-10-24",
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.infoMsgSent
        })
        
        Object.keys(umap).map(name=>{
            for(var i=0; i<volunteers.length; i++){
            if(volunteers[i].volunteerName==name){
                if(!voldet[name]){
                voldet[name]={
                    name,
                    phone: volunteers[i].volunteerPhone,
                    availability: volunteers[i].availability,
                    idCardCollected: volunteers[i].idCardCollected,
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

            console.log(v)

            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*ISKCON Dasara 2023 - Volunteering*
*Tuesday, 24th October 2023*
    
Hare Krishna 🙏
Please accept the blessings of Sri Sri Krishna Balarama 🙏 ${v.availability!="Default"?"We thank you for registering for the *ISKCON Dasara* festival services.":""}

${v.services.length>1?`You have been assigned the following *${v.services.length}* services:`:`You have been assigned the following service:`}

*Service Details:*

Your Name: ${v.name}
Phone: ${v.phone}

${v.services.map(s=>{
return `
🗓️ *Date*: ${s.date}
🛐 *Service*: ${s.service}
🕗 *Timings*: ${s.timings.toTimingCase()}
👑 *Co-ordinator*: ${s.coordinator}
🥇 *SPOC*: ${s.spoc}
📞 *SPOC's Phone number*: ${s.spocPhone}${s.spoc.trim()==v.name?`

You are the SPOC (Single-Point-of-Contact) for this service. Please meet your service coordinator ${s.coordinator} and discuss the details of the service`:``}
    `.trim()
    }).join("\n\n")
    }
    
*YOU CAN ALSO CHECK THESE SERVICE DETAILS USING THE LINK GIVEN BELOW*:
${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}

*Note:*
1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. *Please call your SPOC and discuss the details of service*, dress code etc. The contact numbers of SPOC(s) are mentioned below.

😇 Please report to your services on time. Be responsible for your services.
${!v.idCardCollected?`
🪪 *Volunteer Badges will be issued today from 10 AM to 1 PM and 3 PM to 7 PM at Volunteer Care Cell inside Sridham Hall*. Please collect without fail.
`:``}
🚗 Vehicle parking is not allowed inside temple on 24th. Arrangement for parking is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into parking area is allowed only against ID card

_Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances._

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
    },     
        
        
    "Volunteer Badge Info - ISKCON Dasara": (props)=>{
        var { volunteers } = props.data
        
        const dates = [
            "2023-10-24"
        ]
        
        var umap = {}
        var voldet = {}

        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.idCardCollected && !v.idReminderSent){
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

        return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`🪪 *Volunteer Badge (ID Card) for ISKCON Dasara*

Hare Krishna 🙏
Your volunteer badge will be issued *this Sunday, (22nd October 2023)* in *Sridham Hall* from *9.30 AM to 11 AM and 5 PM to 7 PM*. Please collect the badge without fail.

Note:
1) Volunteer badge is necessary for your availing vehicle parking and dinner prasadam. Parking space is made available in _Pailvan Basavayya Community Hall_ in front of the temple.

2) Dinner prasadam for volunteers will be served in Sridham Hall. Return the volunteer badge at dinner prasadam counter after your service.

If you have any queries regarding issuing of Volunteer Badges, please reply here.

Regards,
Pankajanghri Dasa
ISKCON Mysore`)}`
        })
        },

    "Volunteer Badge Reminder - ISKCON Dasara": (props)=>{
            var { volunteers } = props.data
            
            const dates = [
                "2023-10-24"
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


            let phoneMap = {}

        
            return Object.keys(voldet).sort().map(n=>{
                var v = voldet[n]

                if(!!phoneMap[v.phone]){
                    return ""
                }

                phoneMap[v.phone]=1

            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
Gentle reminder to collect your volunteer badge today.
            
Time: *10 AM to 1 PM and 3 PM to 7 PM*
Venue: Volunteer Care Cell *inside Sridham Hall*

Hare Krishna.`.trim())}`
            }).filter(x=>{
                return x!=""
            })
            }, 
            
    "Service Info - GOV-SPD": (props)=>{

        var { master, volunteers, events } = props.data

        master = master.filter(m=>{
            return m.name!=""
        }).sort((m1, m2)=>{
            return m1.name<m2.name?-1:1
        })
        
        volunteers = volunteers.filter(v=>{
            return v.date!="" && v.volunteerName!="" && v.volunteerPhone!= "" && v.service!="" && !v.infoMsgSent
        }).sort((v1, v2)=>{
            return v1.date>v2.date?1:-1
        })

        let eventMap = {}
        events.forEach(e=>{
            eventMap[e.date] = e.event.trim()
        })

        var volunteerDetails = master.map(v=>{
            v.services = volunteers.filter(vv=>{
                return vv.volunteerName==v.name
            })

            v.festivals = v.services.map(vv=>{
                return vv.date
            }).unique().map(d=>{
                return eventMap[d]
            })

            return v
        })

        return volunteerDetails.filter(v=>{
            return !(v.default && v.services.length==0)
        }).map(v=>{
            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Volunteering Info - ${v.festivals.join(" & ")}*
    
${v.services.length>0?`Hare Krishna 🙏 Please accept the blessings of Sri Sri Krishna Balarama 🙏 ${v.default ? "" : `We thank you for registering for volunteer services for ${v.festivals.join(" & ")} festival${v.festivals.length>1?"s":""}`}.

Service Details:
Your Name: ${v.name}
Phone: ${v.phone}

${v.services.length>1?`You have been assigned the following *${v.services.length}* services:`:`You have been assigned the following service:`}

${v.services.map(s=>{
    return `
🗓️ Date: *${moment(s.date, "YYYY-MM-DD").format("dddd, Do MMMM")}* (${eventMap[s.date]})
🛐 Service: *${s.service}*
🕗 Timings: *${s.timings.toTimingCase()}*
👑 Co-ordinator: *${s.coordinator}*
🥇 SPOC: *${s.spoc}*
📞 SPOC's Phone number: *${s.spocPhone}*${s.spoc.trim()==v.name?`
You are the SPOC (Single-Point-of-Contact) for this service.`:``}
    `.trim()
    }).join("\n\n")
    }

*Service Details Link:*
You can also check these service details using the link given below:
${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}

*General Guidelines:*

1️⃣ Every service has a Single-Point-of-Contact (SPOC) volunteer. Please contact the SPOC(s) of your service(s) to discuss details such as timings and dress code. Their contact numbers are provided above.

🪪 Your volunteer badge will be issued *this Sunday, (12th November 2023)* in *Sridham Hall* from *9.30 AM to 11 AM and 5 PM to 7 PM*. Please collect the badge without fail.

🪪 Please return your ID card at Temple Book-Counter when your services are completed.

😇 Please report to your services on time. Be responsible for your services.

✅ _Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances._`:`We regret to inform you that we are currently unable to assign you a service for Govardhan Puja. The service slots are full due to the low service requirement for this occasion. However, we invite you to join us in the festival celebrations on Tuesday, 14th November, at 5:30 PM.
In the event of an unforeseen service requirement, we may assign you service and in that case, you will receive confirmation message.`}

Regards,
${v.services.length>0?`Pankajanghri Dasa`:`Volunteer Care Cell`}
ISKCON Mysore`.trim())}`
        })
    },   

    "Service Info - SPD": (props)=>{

        var { volunteers } = props.data
            
        const dates = [
            "2023-11-17",
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="")
        })

        Object.keys(umap).map(name=>{
            for(var i=0; i<volunteers.length; i++){
            if(volunteers[i].volunteerName==name){
                if(!voldet[name]){
                voldet[name]={
                    name,
                    phone: volunteers[i].volunteerPhone,
                    availability: volunteers[i].availability,
                    idCardCollected: volunteers[i].idCardCollected,
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
*Volunteering Info - Srila Prabhupada Disappearance Day*
Friday, 17th November 2023

Hare Krishna. Please go through your service details:
Your Name: ${v.name}
Phone: ${v.phone}

${v.services.length>1?`You have been assigned the following *${v.services.length}* services:`:`You have been assigned the following service:`}

${v.services.map(s=>{
    return `
🗓️ Date: *${moment(s.date, "YYYY-MM-DD").format("dddd, Do MMMM")}*
🛐 Service: *${s.service}*
🕗 Timings: *${s.timings.toTimingCase()}*
👑 Co-ordinator: *${s.coordinator}*
🥇 SPOC: *${s.spoc}*
📞 SPOC's Phone number: *${s.spocPhone}*${s.spoc.trim()==v.name?`
You are the SPOC (Single-Point-of-Contact) for this service.`:``}
    `.trim()
    }).join("\n\n")
    }

*Service Details Link:*
You can also check these service details using the link given below:
${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}

*General Guidelines:*

1️⃣ Every service has a Single-Point-of-Contact (SPOC) volunteer. Please contact the SPOC(s) of your service(s) to discuss details such as timings and dress code. Their contact numbers are provided above.

🪪 No volunteer badge will be issued for this festival.

😇 Please report to your services on time. Be responsible for your services.

✅ _Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances._

Regards,
Volunteer Care Cell
ISKCON Mysore`.trim())}`
        })
    },   
    
    "SPOC Info - GOV": (props)=>{

        var { services } = props.data
        const dates = [
            "2023-11-14",
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
                services : []
            }
            spocMap[s.spoc].services.indexOf(s.service)==-1 && spocMap[s.spoc].services.push({
                    service: s.serviceName,
                    date: s.date,
                    coordinator: s.coordinator,
                    coordinatorPhone: s.coordinatorPhone,
                    timings: s.timings,
                    supply: s.supply,
                })
        })

        var spocs = Object.keys(spocMap).sort()

        return spocs.map(sp=>{
        var s = spocMap[sp]

        return `https://web.whatsapp.com/send?phone=91${s.spocPhone}&name=${encodeURIComponent(s.spoc)}&text=${encodeURIComponent(`
*SPOC for Sri Govardhan Puja 2023 services*
*Tuesday, 14th November 2023*

Hare Krishna 🙏. You are assigned as Single-Point-of-Contact (SPOC) for below mentioned ${s.services.length>1?s.services.length:""} service${s.services.length>1?"s":""}. Kindly go through the details of the service${s.services.length>1?"s":""} carefully:

Your Name: ${s.spoc}
Phone: ${s.spocPhone}

${s.services.map(sv=>{
return `
🗓️ Date: *${moment(sv.date, "YYYY-MM-DD").format("dddd, Do MMMM")}*
🛐 Service: *${sv.service}*
🕗 Timings: *${sv.timings.toTimingCase()}*
👑 Coordinator: *${sv.coordinator}*
📞 Coordinator's Phone: *${sv.coordinatorPhone}*
#️⃣ No. of volunteers: *${sv.supply}*
`.trim()
}).join(`

`)}

Please use this link to check the details of the service${s.services.length>1?"s":""} and volunteers under you:
*https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}*

Your responsibilities:
• Please discuss with the service coordinator${s.services.length>1?"s":""} and understand all major and minor details of the service like dress code, timings etc.
• Please call volunteers under you and communicate all the details of the service to them. Phone numbers of all volunteers is availbale in the link shared above.
• Make sure that volunteers report at proper time and in appropriate dress code for their service.

Regards,
Pankajanghri Dasa
ISKCON Mysore
`.trim())}`})
    }, 

    
    "Service Reminder - GOV": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-11-14"
        ]

        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="" && v.service!="")){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="" && v.service!="")
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
                        availability: volunteers[i].availability,
                        serviceDuration: volunteers[i].serviceDuration
                    })
                }
            }
        })


        return Object.keys(voldet).sort().map(n=>{
            var v = voldet[n]
            var isDefault = !!v.services.filter(sss=>{ return (sss.availability=="Default" || sss.availability=="NOT AVAILABLE") }).length

            var vDateMap = {}
            v.services.forEach(vv => {
                vDateMap[vv.date]=1
            })

            return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Gentle Reminder - Govardhana Puja Volunteering Service*
*Tuesday, 14th Nov 2023*

Hare Krishna 🙏

Given below is the details of your service, provided once again for your reference:

*Service Details:*

Your Name: ${v.name}
Phone: ${v.phone}

${v.services.length>1?`You have been assigned the following *${v.services.length}* services:`:`You have been assigned the following service:`}

${v.services.map(s=>{
    return `
🗓️ Date: *${moment(s.date, "YYYY-MM-DD").format("dddd, Do MMMM")}*
🛐 Service: *${s.service}*
🕗 Timings: *${s.timings.toTimingCase()}*
👑 Co-ordinator: *${s.coordinator}*
🥇 SPOC: *${s.spoc}*
📞 SPOC's Phone number: *${s.spocPhone}*${s.spoc.trim()==v.name?`
You are the SPOC (Single-Point-of-Contact) for this service.`:``}
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

    "Volunteer Badge Reminder - GOV": (props)=>{
        var { volunteers } = props.data
        
        const dates = [
            "2023-11-14"
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


        let phoneMap = {}

    
        return Object.keys(voldet).sort().map(n=>{
            var v = voldet[n]

            if(!!phoneMap[v.phone]){
                return ""
            }

            phoneMap[v.phone]=1

        return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
*Volunteer Badge* - Gentle reminder to collect your volunteer badge today.
        
Time: *3.30 PM to 6 PM*
Venue: Near Homa Kunda area

Hare Krishna.`.trim())}`
        }).filter(x=>{
            return x!=""
        })
        }, 

    "Volunteer Badge Return Reminder - GOV": (props)=>{
    var { volunteers } = props.data
    
    const dates = [
        "2023-11-14"
    ]
    
    var umap = {}
    var voldet = {}

    var volunteers = volunteers.filter(v=>{
        if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && v.idCardCollected && !v.idCardReturned){
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


    let phoneMap = {}


    return Object.keys(voldet).sort().map(n=>{
        var v = voldet[n]

        if(!!phoneMap[v.phone]){
            return ""
        }

        phoneMap[v.phone]=1

    return `https://web.whatsapp.com/send?phone=91${v.phone}&name=${encodeURIComponent(v.name)}&text=${encodeURIComponent(`
Hare Krishna.
Kindly return your volunteer badge of Govardhan Puja festival at Temple Book Counter on or before Sunday, 19th Nov`.trim())}`
    }).filter(x=>{
        return x!=""
    })
    }, 


    "Service Info - VKE23": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-12-23",
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.infoMsgSent
        })
        
        Object.keys(umap).map(name=>{
            for(var i=0; i<volunteers.length; i++){
            if(volunteers[i].volunteerName==name){
                if(!voldet[name]){
                voldet[name]={
                    name,
                    phone: volunteers[i].volunteerPhone,
                    availability: volunteers[i].availability,
                    idCardCollected: volunteers[i].idCardCollected,
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
*Service Details - Vaikunta Ekadashi 2023 - Volunteering*
*Saturday, 23rd December 2023*
    
Hare Krishna 🙏
Please accept the blessings of Sri Sri Krishna Balarama 🙏 ${(v.availability!="Default" && v.availability!="NOT AVAILABLE")?"We thank you for registering for the *Vaikunta Ekadashi* festival service.":""}

*Guidelines:*

👀 Please read this message completely. It takes only a minute ⌛

💾 Please save this number as ISKCON Mysore Volunteering or with any other convenient name. If you do not do this, you may NOT be able to click on the links given below.

🪪 *Volunteer Badges will be issued on Friday, 22nd December 2023 from 10 AM to 1.30 PM and 3 PM to 9 PM at Volunteer Care Cell near Sridham Hall*. Please collect without fail.

🚗 Vehicle parking is not allowed inside the temple on the festival day. Parking arrangement is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into the parking area is allowed only with Volunteer Badge.

1️⃣ Every service has got a Single-Point-of-Contact (SPOC) volunteer. *Please call your SPOC and discuss the details of service*, dress code, etc. The contact numbers of SPOC(s) are mentioned in the link below.

😇 Please report to your services on time. Be responsible for your services.

*Service Details:*

Now please see your service details by clicking on the link given below:

*${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}*

_Please re-check your service before the festival using the above link. Sometimes your service may change due to unavoidable circumstances._

You can reply here regarding any queries.

Regards,
Pankajanghri Dasa
ISKCON Mysore`.trim())}`})
    }, 
    
    "Service Reminder - VKE23": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-12-23",
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && !v.serviceReminderSent
        })
        
        Object.keys(umap).map(name=>{
            for(var i=0; i<volunteers.length; i++){
            if(volunteers[i].volunteerName==name){
                if(!voldet[name]){
                voldet[name]={
                    name,
                    phone: volunteers[i].volunteerPhone,
                    availability: volunteers[i].availability,
                    idCardCollected: volunteers[i].idCardCollected,
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
*Service Reminder - Vaikunta Ekadashi 2023 - Volunteering*
    
Hare Krishna 🙏
We hope that you have gone through the service details and have contacted your SPOC(s) regarding the service details.

We now request you to please *recheck your service details and dates of service* by clicking on the link given below:

*${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}*

You can reply here regarding any queries.

Regards,
ISKCON Mysore`.trim())}`})
    },     
    
    "Volunteer Badge Reminder - VKE23": (props)=>{

        var { volunteers } = props.data
        
        const dates = [
            "2023-12-23",
        ]
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && v.idCardPrinted && !v.idReminderSent
        })
        
        Object.keys(umap).map(name=>{
            for(var i=0; i<volunteers.length; i++){
            if(volunteers[i].volunteerName==name){
                if(!voldet[name]){
                voldet[name]={
                    name,
                    phone: volunteers[i].volunteerPhone,
                    availability: volunteers[i].availability,
                    idCardCollected: volunteers[i].idCardCollected,
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
*Volunteer Badge - Vaikunta Ekadashi 2023 - Volunteering*
    
Hare Krishna 🙏

🪪 *Volunteer Badges will be issued today (Sunday, 17th December 2023) from 10 AM to 1 PM and 3 PM to 8 PM at Volunteer Care Cell inside Sridham Hall*. Please collect without fail.

🚗 Vehicle parking is not allowed inside the temple on the festival day. Parking arrangement is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into the parking area is allowed only with Volunteer Badge.

🪪 Volunteer Coupon can be shown for honoring Volunteer Prasadam. This badge can be used as volunteer prasadam coupon. 

You can reply here regarding any queries.

Regards,
ISKCON Mysore`.trim())}`})
    },

    "SPOC Info - VKE23": (props)=>{

        var { services } = props.data
        const dates = [
            "2023-12-23",
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
                services : []
            }
            spocMap[s.spoc].services.indexOf(s.service)==-1 && spocMap[s.spoc].services.push({
                    service: s.serviceName,
                    date: s.date,
                    coordinator: s.coordinator,
                    coordinatorPhone: s.coordinatorPhone,
                    timings: s.timings,
                    supply: s.supply,
                })
        })

        var spocs = Object.keys(spocMap).sort()

        return spocs.map(sp=>{
        var s = spocMap[sp]

        return `https://web.whatsapp.com/send?phone=91${s.spocPhone}&name=${encodeURIComponent(s.spoc)}&text=${encodeURIComponent(`
*SPOC for Vaikunta Ekadashi 2023 services*
*Saturday, 23rd December 2023*

Hare Krishna 🙏. You are assigned as Single-Point-of-Contact (SPOC) for ${s.services.length>1?s.services.length:"a"} service${s.services.length>1?"s":""}. Kindly click on the below link and through the details of the service${s.services.length>1?"s":""} carefully:

*https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}*

Your responsibilities:
• Please discuss with the service coordinator${s.services.length>1?"s":""} and understand all major and minor details of the service like dress code, timings etc.
• Please call volunteers under you and communicate all the details of the service to them. Phone numbers of all volunteers are availbale in the link shared above.
• Make sure that volunteers report at proper time and in appropriate dress code for their service.

Regards,
Pankajanghri Dasa
ISKCON Mysore
`.trim())}`})
    },     
    
}

export default templates