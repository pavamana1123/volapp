import moment from "moment";

function ServiceList(props){

    var { data } = props
    var { volunteers } = data

    if(!data || !volunteers){
        return <div>No data</div>
    }

    const urlParams = new URLSearchParams(window.location.search);
    var date = moment(urlParams.get('date'), "YYYYMMDD").format("YYYY-MM-DD")

    volunteers = volunteers.filter(v=>{
        return v.volunteerName!="" && v.date!="" && v.service != "" && v.date==date
    }).sort((v1, v2)=>{
        return v1.volunteerName<v2.volunteerName?-1:1
    }).sort((v1, v2)=>{
        
    })

    // console.log(volunteers)

    var vn = {}
    volunteers.forEach(v => {
        if(v.volunteerName!=""){
            vn[v.volunteerName]=0
        }
    })
    var volunteerNames = Object.keys(vn).sort()

    var tdata = []

    volunteerNames.forEach(v=>{

        var services

        tdata.push({
            volunteerName: {
                value: v
            }
        })
    })

    return (
        <div>
            <table>

            </table>

        </div>
    )
}

export default ServiceList