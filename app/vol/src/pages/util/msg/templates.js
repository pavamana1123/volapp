import moment from 'moment'

var dates = [
    "2024-06-20",
]

var templates = {

    "01 - SPOC Info": (props)=>{

        var { services } = props.data

        services = services.filter(s=>{
            return dates.indexOf(s.date)!=-1
        })  

        var spocMap = {}

        services.map(s=>{
            // if(s.coordinator==s.spoc || s.spoc=="" || s.spocPhone==""){
            //     return
            // }

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
*SPOC for Panihati Chida-Dahi Utsav services*
*Thursday, 20th June 2024*

Hare Krishna 🙏. You are assigned as Single-Point-of-Contact (SPOC) for ${s.services.length>1?s.services.length:"a"} service${s.services.length>1?"s":""}. Kindly click on the below link and go through the details of the service${s.services.length>1?"s":""} carefully:

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

    "02 - Service Info": (props)=>{

        var { volunteers } = props.data
        
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
*Service Details - Panihati Chida-Dahi Utsav - Volunteering*
*Thursday, 20th June 2024*
    
Hare Krishna 🙏
Please accept the blessings of Sri Sri Krishna Balarama 🙏 You have been assigned volunteer service for Sri Narasimha Jayanthi festival. Please check your service details by clicking on the link given below:

*${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}*

You can reply here regarding any queries.

Regards,
Volunteer Care Cell
ISKCON Mysore`.trim())}`})
    }, 

    "03 - Volunteer Badge Reminder": (props)=>{

        var { volunteers } = props.data
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && v.idCardPrinted && !v.idReminderSent && !v.idCardCollected
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
*Volunteer Badge - Panihati Chida-Dahi Utsav - Volunteering*
    
Hare Krishna 🙏

🪪 *Volunteer Badges will be issued today (Friday, 5th January 2024) from 9.30 AM to 1 PM and 4 PM to 9 PM at Volunteer Care Cell near Homa-Kunda area*. Please collect without fail.

🚗 Vehicle parking is not allowed inside the temple on the festival day. Parking arrangement is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into the parking area is allowed only with Volunteer Badge.

🪪 This volunteer-badge must be presented for honoring volunteer prasadam. It can be used as volunteer prasadam coupon. 

You can call this number- 6360028651 (ISKCON Mysore Volunteering) or reply here regarding any queries.

Regards,
ISKCON Mysore`.trim())}`})
    },

    "04 - Service Update Alert for SPOCs": (props)=>{

        var { services } = props.data

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
*SPOC - Service Update Alert ⚠️ - Panihati Chida-Dahi Utsav*
*Thursday, 20th June 2024*
    
Hare Krishna 🙏

This is to bring to your notice that *some* services were updated/changed recently. These changes may include change/addition of service, change/addition of volunteers, change of service timings or change of SPOC/Coordinator.

*NOTE*: Services/Volunteers under you may be changed/updated or may not be. *Therefore we request you to please re-check your SPOC service details by clicking on the link given below:*

*${`https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}`}*

*❗ IMPORTANT: As a general practice, please re-check your service details everyday until the festival using the above link; because your service may be changed/updated due to unavoidable circumstances.*

You can reply here regarding any queries.

Regards,
Volunteer Care Cell
ISKCON Mysore
`.trim())}`})
    }, 
    
    "05 - Service Update Alert for Volunteers": (props)=>{

        var { volunteers } = props.data
        
        var umap = {}
        var voldet = {}
    
        var volunteers = volunteers.filter(v=>{
            if(dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") ){
                umap[v.volunteerName]=v.volunteerPhone
            }
            return dates.indexOf(v.date)!=-1 && (v.volunteerName!="" && v.volunteerPhone!="") && v.infoMsgSent
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
*Service Update Alert ⚠️ - Panihati Chida-Dahi Utsav - Volunteering*
*Thursday, 20th June 2024*
    
Hare Krishna 🙏

This is to bring to your notice that *some* services were updated/changed recently. These changes may include change/addition of service, change of service timings or change of SPOC/Coordinator.

*NOTE*: Your service may be changed/updated or may not be. *Therefore we request you to please re-check your service details by clicking on the link given below:*

*${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}*

*❗ IMPORTANT: As a general practice, please re-check your service details everyday until the festival using the above link; because your service may be changed/updated due to unavoidable circumstances.*

You can reply here regarding any queries.

Regards,
Volunteer Care Cell
ISKCON Mysore`.trim())}`})
    }, 

    "06 - SPOC Reminder": (props)=>{

        var { services } = props.data

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
*SPOC - Reminder - Sri Narasimha Jayanthi Volunteering*

Hare Krishna 🙏

Hope you have discussed with the service coordinator${s.services.length>1?"s":""} and understood the details of your service${s.services.length>1?"s":""} and also have called your volunteers. If not please do it by today.

You are assigned as Single-Point-of-Contact (SPOC) for ${s.services.length>1?s.services.length:"a"} service${s.services.length>1?"s":""}. *Some service details and volunteers were updated recently*. So kindly recheck the service details by clicking on the below link:

*https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}*

Regards,
Pankajanghri Dasa
ISKCON Mysore
`.trim())}`})
    },   

    "07 - Service Reminder": (props)=>{

        var { volunteers } = props.data
        
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
*Service Reminder - Panihati Chida-Dahi Utsav - Volunteering*
    
Hare Krishna 🙏
We hope that you have gone through the service details and have contacted your SPOC(s) regarding the service details.

We now request you to please *recheck your service details and dates of service* by clicking on the link given below:

*${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}*

‼️🪪 *DO NOT FORGET TO BRING YOUR VOLUNTEER BADGE ON FESTIVAL DAY (23rd)*

You can reply here regarding any queries.

Regards,
ISKCON Mysore`.trim())}`})
    }, 

    "08 - General Info": (props)=>{

        var { volunteers } = props.data
        
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
⭐ *Important Info - Panihati Chida-Dahi Utsav - Volunteering*
*Thursday, 20th June 2024*
    
Hare Krishna 🙏 Hoping that you are ready for the Sri Narasimha Jayanthi services. Here are some important points you need to know. Please note.

1️⃣ 🙏 *Prasadam Timings and Venue:*

    👉🏻 Breakfast prasadam:
    🕗 Time: 8.15 AM - 9.15 AM
    📍 Location: Sridham Hall

    👉🏻 Lunch prasadam:
    🕗 Time: 1 PM - 2 PM
    📍 Location: Sridham Hall
    
    👉🏻 Dinner prasadam:
    🕗 Time: *15 minutes after Ratha arrives at ISKCON temple* 
    📍 Location: Sridham Hall

2️⃣ 🚍 *Bus Facility:*

    🚌 Onward Bus facility is arranged for devotees to go from ISKCON temple to Kote Anjaneya temple. Buses will leave at below mentioned times:
    🚎 Bus 1 Departure: 3.30 PM
    🚎 Bus 2 Departure: 3.45 PM
    
    🚌 Return Bus facility is arranged *ONLY FOR THOSE VOLUNTEERS WHO HAVE PRASADAM SERVING OR QUE MANAGEMENT SERVICE IN TEMPLE*. Others should NOT use this bus facility.
    🚎 🚎 Bus 1 and Bus 2 Departure: 6.45 PM
    📍 Departure from: Ramaswamy Circle

3️⃣ Volunteer Care Cell will be located in front of the temple parking shed, diagonally opposite to Sridham Hall. You can contact the cell for any queries or call 6360028651.

4️⃣ 🪪 *Use of Volunteer Badge:*

    Your volunteer badge can be used for the below-mentioned purposes. Please keep it carefully and do not lose it.
    👉🏻 Show the QR code on the back side of the volunteer badge to avail prasadam.
    👉🏻 *Return volunteer badge to Volunteer Care Cell and collect take-home prasadam.*

You can reply here regarding any queries or call 6360028651.

Regards,
Volunteer Care Cell
ISKCON Mysore`.trim())}`})
    },     
    
}

export default templates