import moment from 'moment'

var dates = [
    "2024-01-06",
]

var templates = {

    "01 - SPOC Info": (props)=>{

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
*SPOC for Ratha Yatra 2024 services*
*Saturday, 6th January 2024*

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
*Service Details - Ratha Yatra 2024 - Volunteering*
*Saturday, 6th January 2024*
    
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
*Volunteer Badge - Ratha Yatra 2024 - Volunteering*
    
Hare Krishna 🙏

🪪 *Volunteer Badges will be issued today (Friday, 22nd December 2023) from 10 AM to 1.30 PM and 3 PM to 9 PM at Volunteer Care Cell near Homa-Kunda area* in the temple. Please collect without fail.

🚗 Vehicle parking is not allowed inside the temple on the festival day. Parking arrangement is made in _Pailvan Basavayya Community Hall_ in front of the temple. Entry into the parking area is allowed only with Volunteer Badge.

🪪 This volunteer-badge must be presented for honoring volunteer prasadam. It can be used as volunteer prasadam coupon. 

You can reply here regarding any queries.

Regards,
ISKCON Mysore`.trim())}`})
    },    

    "04 - SPOC Reminder": (props)=>{

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
*SPOC - Reminder - Vaikunta Ekadashi Volunteering*

Hare Krishna 🙏

Hope you have discussed with the service coordinator${s.services.length>1?"s":""} and understood the details of your service${s.services.length>1?"s":""} and also have called your volunteers. If not please do it by today.

You are assigned as Single-Point-of-Contact (SPOC) for ${s.services.length>1?s.services.length:"a"} service${s.services.length>1?"s":""}. *Some service details and volunteers were updated recently*. So kindly recheck the service details by clicking on the below link:

*https://vol.iskconmysore.org/services?SPOC=${encodeURIComponent(s.spoc)}*

Regards,
Pankajanghri Dasa
ISKCON Mysore
`.trim())}`})
    },   

    "05 - Service Reminder": (props)=>{

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
*Service Reminder - Ratha Yatra 2024 - Volunteering*
    
Hare Krishna 🙏
We hope that you have gone through the service details and have contacted your SPOC(s) regarding the service details.

We now request you to please *recheck your service details and dates of service* by clicking on the link given below:

*${`https://vol.iskconmysore.org/vol?name=${encodeURIComponent(v.name)}`}*

‼️🪪 *DO NOT FORGET TO BRING YOUR VOLUNTEER BADGE ON FESTIVAL DAY (23rd)*

You can reply here regarding any queries.

Regards,
ISKCON Mysore`.trim())}`})
    }, 
    
}

export default templates