const dbapi = async (req, res, dbcon)=>{
    const endpoint = req.headers.endpoint
    const body = req.body
    switch(endpoint){
        case "set-badge-collect":
            return setBadgeCollect(res, dbcon, body)
        case "get-badge-collect":
            return getBadgeCollect(res, dbcon, body)
        case "unset-badge-collect":
            return unsetBadgeCollect(res, dbcon, body)
        default:
            res.status(404).send("Invalid endpoint")
    }
}

const setBadgeCollect = async (res, dbcon, body)=>{
    const query = `insert into badgeCollect (date, time, edate, vname, cname, cphone)
    values(
        "${body.date}",
        "${body.time}",
        "${body.edate}",
        "${body.vname}",
        ${body.cname?`"${body.cname}"`:"NULL"},
        ${body.cphone?`"${body.cphone}"`:"NULL"}
    )`

    try {
        var result = await dbcon.execQuery(query)
        res.status(result.affectedRows?200:204).end()
    }catch(error){
        res.status(500).send(error.toString())
    }
}

const unsetBadgeCollect = async (res, dbcon, body)=>{
    const query = `delete from badgeCollect where edate="${body.edate}" and vname="${body.vname}"`

    try {
        var result = await dbcon.execQuery(query)
        res.status(result.affectedRows?200:204).end()
    }catch(error){
        res.status(500).send(error.toString())
    }
}

const getBadgeCollect = async (res, dbcon, body)=>{
    const query = `select * from badgeCollect where edate="${body.edate}"`

    try {
        var result = await dbcon.execQuery(query)
        res.status(200).send(JSON.stringify(result))
    }catch(error){
        res.status(500).send(error.toString())
    }
}

module.exports = dbapi