var config = require("./config.js")
var APIHandler = require("./api.js")

var api = new APIHandler(config.scriptId)

const express = require('express')
const app = express()
app.use(express.json())
const port = 3001

app.post('/api', api.call.bind(api))

app.listen(port, ()=>console.log("Server running on port :" + port))