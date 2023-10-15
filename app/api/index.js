const moment = require('moment')
const originalConsoleLog = console.log;

console.log = function (...args) {
  const timestamp = new Date().toISOString();
  originalConsoleLog.apply(console, [`[${moment(timestamp).format("YY-MMM-DD HH:mm")}]`, ...args]);
};

let config = require("./config.js")
let Cacher = require("./cacher.js")

global.cacher = new Cacher(config.scriptId)
global.cacher.start()

const express = require('express');
const api = require('./api.js');
const app = express()
app.use(express.json())
const port = 3005

app.post('/api', api)

app.listen(port, ()=>console.log("Server running on port :" + port))