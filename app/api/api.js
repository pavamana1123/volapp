const api = (req, res)=>{
    switch(req.headers['endpoint']){
        case "/updateInteraktUsers":

            breakv

        default:
            if(global.cacher.timestamp){
                res.status(200).send({
                    data: global.cacher.data,
                    timestamp: global.cacher.timestamp
                })
            }else{
                res.status(503).send()
            }
    }
}

module.exports = api