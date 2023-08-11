const moment = require('moment')
const originalConsoleLog = console.log;

console.log = function (...args) {
  const timestamp = new Date().toISOString();
  originalConsoleLog.apply(console, [`[${moment(timestamp).format("YY-MMM-DD HH:mm")}]`, ...args]);
};

var config = require("./config.js")
var Cacher = require("./api.js")

var cacher = new Cacher(config.scriptId)
cacher.start()

const express = require('express')
const app = express()
app.use(express.json())
const port = 3005

app.post('/api', (req, res)=>{
    if(cacher.timestamp){
        res.status(200).send({
            data: cacher.data,
            timestamp: cacher.timestamp
        })
    }else{
        res.status(503).send()
    }
})

app.listen(port, ()=>console.log("Server running on port :" + port))