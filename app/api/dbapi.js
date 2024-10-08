const axios = require('axios')

const dbapi = async (req, res, dbcon) => {
    const endpoint = req.headers.endpoint
    const body = req.body
    switch (endpoint) {
        case "set-badge-issue":
            return setBadgeIssue(res, dbcon, body)
        case "get-badge-issue":
            return getBadgeIssue(res, dbcon, body)
        case "unset-badge-issue":
            return unsetBadgeIssue(res, dbcon, body)

        case "set-prasadam-issue":
            return setPrasadamIssue(res, dbcon, body)
        case "get-prasadam-issue":
            return getPrasadamIssue(res, dbcon, body)
        case "unset-prasadam-issue":
            return unsetPrasadamIssue(res, dbcon, body)

        case "set-reporting":
            return setReporting(res, dbcon, body)
        case "get-reporting":
            return getReporting(res, dbcon, body)
        case "unset-reporting":
            return unsetReporting(res, dbcon, body)

        case "/verify-user":
            axios.post('https://sevabase.iskconmysore.org/api', body, {
                headers: {
                    'Content-Type': 'application/json',
                    endpoint: '/verify-user'
                }
            }).then(() => {
                res.status(200).send()
            }).catch(() => {
                res.status(404).send("unregistered")
            })
            break
        default:
            res.status(404).send("Invalid endpoint")
    }
}

const setBadgeIssue = async (res, dbcon, body) => {
    const query = `insert into badgeissue (date, edate, vname, cname, cphone)
    values(
        "${body.date}",
        "${body.edate}",
        "${body.vname}",
        ${body.cname ? `"${body.cname}"` : "NULL"},
        ${body.cphone ? `"${body.cphone}"` : "NULL"}
    ) on duplicate key update date="${body.date}", cname=${body.cname ? `"${body.cname}"` : "NULL"}, cphone=${body.cphone ? `"${body.cphone}"` : "NULL"};
    select * from badgeissue where edate="${body.listedDate || body.edate}" order by date desc
    `

    try {
        var result = await dbcon.execQuery(query)
        res.status(200).end(JSON.stringify(result[1]))
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const unsetBadgeIssue = async (res, dbcon, body) => {
    const query = `delete from badgeissue where edate="${body.edate}" and vname="${body.vname}";
    select * from badgeissue where edate="${body.listedDate || body.edate}" order by date desc`

    try {
        var result = await dbcon.execQuery(query)
        res.status(200).send(JSON.stringify(result[1]))
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const getBadgeIssue = async (res, dbcon, body) => {
    const query = `select * from badgeissue where edate="${body.edate}" order by date desc`

    try {
        var result = await dbcon.execQuery(query)
        res.status(200).send(JSON.stringify(result))
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const setPrasadamIssue = async (res, dbcon, body) => {
    const query = `insert into prasadamissue (date, edate, vname, tod)
    values(
        "${body.date}",
        "${body.edate}",
        "${body.vname}",
        "${body.tod}"
    ) on duplicate key update date="${body.date}";
    select * from prasadamissue where edate="${body.edate}" order by date desc
    `

    try {
        var result = await dbcon.execQuery(query)
        res.status(200).end(JSON.stringify(result[1]))
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const unsetPrasadamIssue = async (res, dbcon, body) => {
    const query = `delete from prasadamissue where edate="${body.edate}" and vname="${body.vname}" and tod="${body.tod}";
    select * from prasadamissue where edate="${body.edate}" order by date desc`

    try {
        var result = await dbcon.execQuery(query)
        res.status(200).send(JSON.stringify(result[1]))
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const getPrasadamIssue = async (res, dbcon, body) => {
    const query = `select * from prasadamissue where edate="${body.edate}" order by date desc`

    try {
        var result = await dbcon.execQuery(query)
        res.status(200).send(JSON.stringify(result))
    } catch (error) {
        res.status(500).send(error.toString())
    }
}


const setReporting = async (res, dbcon, body) => {
    const query = `insert into reporting (date, service, volunteer)
    values(
        "${body.date}",
        "${body.service}",
        "${body.volunteer}"
    ) on duplicate key update date="${body.date}";
    select * from reporting where ${body.dates.map(d => {
        return `date="${d}"`
    }).join(" or ")} order by date;
    `

    try {
        var result = await dbcon.execQuery(query)
        res.status(200).end(JSON.stringify(result[1]))
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const unsetReporting = async (res, dbcon, body) => {
    const query = `delete from reporting where date="${body.date}" and volunteer="${body.volunteer}" and service="${body.service}";
    select * from reporting where ${body.dates.map(d => {
        return `date="${d}"`
    }).join(" or ")} order by date;`

    try {
        var result = await dbcon.execQuery(query)
        res.status(200).send(JSON.stringify(result[1]))
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const getReporting = async (res, dbcon, body) => {
    const query = `select * from reporting where ${body.dates.map(d => {
        return `date="${d}"`
    }).join(" or ")};`

    try {
        var result = await dbcon.execQuery(query)
        res.status(200).send(JSON.stringify(result))
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

module.exports = dbapi