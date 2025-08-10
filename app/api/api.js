const os = require('os')
const fs = require('fs')

class Cacher {
    constructor(config) {
        this.scriptId = config.scriptId
        this.sheetID = config.sheetID
        const { google } = require('googleapis')
        var credentials = JSON.parse(fs.readFileSync('credentials.json'))
        var token = JSON.parse(fs.readFileSync('token.json'))
        const { client_secret, client_id, redirect_uris } = credentials.installed

        const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
        auth.setCredentials(token)

        this.client = google.script({ version: 'v1', auth })

        this.data = {}
        this.timestamp = null
    }

    start() {
        // Load existing data from data.json
        try {
            let raw = fs.readFileSync('data.json', 'utf8')
            if (raw.trim() === '') {
                this.data = {}
            } else {
                this.data = JSON.parse(raw)
            }
        } catch (err) {
            console.log('No valid data.json found, starting with empty data.')
            this.data = {}
        }

        this.getData()
        setInterval(this.getData.bind(this), (() => {
            if (os.platform() === 'win32') {
                return 15 * 60 * 1000
            } else {
                return 5 * 60 * 1000
            }
        })())
    }

    getData() {
        var self = this
        console.log('Initiating data fetch from sheets!')
        this.client.scripts.run({
            resource: {
                function: "getData",
                parameters: this.sheetID
            },
            scriptId: this.scriptId,
        }, function (error, response) {
            console.log('Received data from sheets!')
            if (error) {
                console.log("Could not get data:", error)
                return
            }

            if (!response) {
                console.log("Empty response!")
                return
            } else {
                if (response.error) {
                    console.log("Error response:", response.error)
                    return
                }

                if (response.data.error) {
                    console.log("Error in data:", response.data.error)
                    return
                }
            }
            self.data = response.data.response.result
            self.timestamp = new Date()

            // Save fetched data to data.json
            try {
                fs.writeFileSync('data.json', JSON.stringify(self.data, null, 2), 'utf8')
                console.log('Data written to data.json')
            } catch (err) {
                console.error('Failed to write data.json:', err)
            }
        })
    }

}

module.exports = Cacher
