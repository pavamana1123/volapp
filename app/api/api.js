const fs = require("fs")
const path = require("path")

class APIHandler {
    constructor(scriptId){
        this.scriptId = scriptId

        const fs = require('fs');
        const {google} = require('googleapis');
        var credentials = JSON.parse(fs.readFileSync('credentials.json'))
        var token = JSON.parse(fs.readFileSync('token.json'))
        const {client_secret, client_id, redirect_uris} = credentials.installed;

        const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        auth.setCredentials(token);

        this.client = google.script({version: 'v1', auth});
    }

    call(req, res){
        var error = null
        var errorMsg = ""

        if(!(req.body.func || req.body.assessmentId)){
            errorMsg = "script function name or assessmentId is not specified"
            console.log("user:", req.headers.user, "errorMsg:", errorMsg)
            res.status(400)
            res.send(setResponse(null, errorMsg, errorMsg))
            return
        }

        var funcResp = {}
        var fileResp = {}

        if(req.body.assessmentId){
            const userPath = `./data/${req.headers.phone||""}/${req.body.assessmentId}.json`
            const assessmentPath = `./data/${req.body.assessmentId}.json`
            try{
                if(req.body.write){
                    if(req.headers.phone){
                        const dir = path.dirname(userPath)
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir, { recursive: true });
                        }
                        fs.writeFileSync(userPath, JSON.stringify(req.body.body))
                        res.statusCode = 200
                    }else{
                        fs.writeFileSync(assessmentPath, req.body.body)
                        res.statusCode = 200
                    }
                }else{
                    var userData = {} 
                    if(req.headers.phone){
                        userData = readJSON(userPath)
                    }
                    var assessmentData = readJSON(assessmentPath)
                    for(var i in userData){
                        assessmentData[i]={...assessmentData[i], ...userData[i]}
                    }
                    fileResp = {"file":{ ...userData, ...assessmentData }}
                }
            }catch (err) {
                error = err
                errorMsg = error.toString()
                res.status(500)
            }
        }

        if(req.body.func){
            this.client.scripts.run({
                resource: {
                    function: req.body.func,
                    parameters: req.body.params
                },
                scriptId: this.scriptId,
            }, function(scriptError, scriptResponse) {
    
                if (scriptError) {
                    error = scriptError
                    errorMsg = 'The API encountered a problem before the script started executing'
                }
    
                if (scriptResponse.error) {
                    error = scriptResponse.error
                    errorMsg = 'API returned an error'
                } 
    
                if(scriptResponse.data.error){
                    error = scriptResponse.data.error.details
                    errorMsg = scriptResponse.data.error.details[0].errorMessage
                }
    
                if(error){
                    console.log("user:", req.headers.user, "errorMsg:", errorMsg)
                    res.status(500)
                    res.send(setResponse(null, error, errorMsg))
                }else{
                    res.statusCode = 200
                    funcResp = scriptResponse.data.response.result
                    res.send(setResponse({...funcResp, ...fileResp}, error, errorMsg))
                }
            });
        }
    }
}

function readJSON(path) {
    var data = {}
    if (fs.existsSync(path)) {
        data = JSON.parse(fs.readFileSync(path, "utf8"))
    }
    return data
}

function setResponse(data, error, msg){
    return {
        data,
        error,
        msg
    }
}

module.exports = APIHandler