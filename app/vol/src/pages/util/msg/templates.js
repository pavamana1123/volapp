import moment from 'moment'

var dates = [
    "2025-01-09",
    "2025-01-10",
    "2025-01-11"
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
*SPOC for Sri Vaikunta Ekadashi - Volunteering Services*

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
Volunteering Details – Sri Vaikuntha Ekadashi – Friday, 10th January 2025

Hare Krishna 🙏

🌸 Please accept the blessings of Sri Sri Krishna Balarama 🌸
You have been assigned volunteer service for Sri Vaikuntha Ekadashi. Kindly check your service details by clicking on this link:
👉 https://sevabase.iskconmysore.org

🪪 Volunteer Badges Distribution:
 📅 Thursday, 9th January
  ⏰ Time: 4:30 PM to 8:30 PM
  📍 Venue: Near Homa Kunda area

 📅 Friday, 10th January
  ⏰ Time: 8:00 AM to 6:00 PM
  📍 Venue: Volunteer Care Cell (near temple book counter)

💬 Feel free to reply here for any queries or clarifications.

🙏 Regards,
Volunteer Care Cell
ISKCON Mysore`.trim())}`})
    }, 

    "03 - Volunteer Badge Info": (props)=>{

        var { volunteers, events } = props.data
        
        var umap = {}
        var voldet = {}

        var eventDates = events.filter(e => e.badge).map(e => e.date)
    
        var volunteers = volunteers.filter(v => eventDates.indexOf(v.date)!=-1).filter(v=>{
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
*Volunteer Badge - Sri Vaikunta Ekadashi*
    
Hare Krishna 🙏

🪪 Volunteer Badges will be issued on Sunday, 22nd December 2024:

⌚ Time: 9.30 AM to 1 PM & 4.30 PM to 8.30 PM
📍 Venue: Sridham Hall

You can reply here regarding any queries.

Regards,
Volunteer Care Cell
ISKCON Mysore`.trim())}`})
    },

    "033 - Volunteer Badge Reminder": (props)=>{

        var { volunteers, events } = props.data
        
        var umap = {}
        var voldet = {}

        var eventDates = events.filter(e => e.badge).map(e => e.date)
    
        var volunteers = volunteers.filter(v => eventDates.indexOf(v.date)!=-1).filter(v=>{
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
*Gentle reminder to collect your Volunteer Badge today!*
    
Hare Krishna 🙏

🪪 Volunteer Badges will be issued today:

⌚ Time: 9.30 AM - 1 PM and 4.30 PM - 8.30 PM
📍 Venue: Sridham Hall

Regards,
Volunteer Care Cell
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
*SPOC - Service Update Alert ⚠️ - Sri Vaikunta Ekadashi*
    
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
*Service Update Alert ⚠️ - Sri Vaikunta Ekadashi - Volunteering*
    
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
*SPOC - Reminder - Sri Radhashtami Volunteering*

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
Service Reminder 🌟 - Sri Vaikunta Ekadashi - Volunteering 🙌

Hare Krishna 🙏
We hope you have reviewed your service details and contacted your SPOC(s).

We kindly request you to recheck your service details and dates of service using the link below. Services may be updated due to unavoidable circumstances:
👉 https://sevabase.iskconmysore.org

🔔 Important Points to Note:
1️⃣ Service Timings:
Be clear about your service timings. For any doubts, contact your SPOC or message here.

2️⃣ Parking Information:

Parking for volunteers will be provided in the construction area near the new temple building.
Access is granted only with your volunteer badge.
3️⃣ Volunteer Care Cell:

Located near the temple book counter (behind the flower garden).
For any queries, visit the Volunteer Care Cell.
4️⃣ Volunteer Badge:

Do not forget to wear your badge!
If you haven’t collected it yet, please visit the Volunteer Care Cell:
Today: 4:30 PM onwards
Tomorrow: From 8:30 AM
5️⃣ Badge Return:

Return your badge to the Volunteer Care Cell after completing your service to receive take-home prasadam.
Deadline for returning the badge: Sunday, 12th Jan 2025
6️⃣ Badge Validity:

The volunteer badge is valid only on Friday, 10th Jan 2025.
7️⃣ Volunteer Prasadam Details:

Location: Sridham Hall (back side).
Present the QR code on your badge at the entrance.
Volunteer Prasadam Timings:
Breakfast Prasadam: 9:00 AM - 11:00 AM
Lunch Prasadam: 1:00 PM - 3:00 PM
Dinner Prasadam: 8:30 PM - 9:30 PM
For any queries, feel free to reply here.

Warm regards,
Volunteer Care Cell
ISKCON Mysore 🌸`.trim())}`})
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
⭐ *Important Info - Sri Vaikunta Ekadashi - Volunteering*
    
Hare Krishna 🙏 Hoping that you are ready for the Sri Radhashtami services. Here are some important points you need to know. Please note.

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