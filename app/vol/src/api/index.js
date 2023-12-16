class API {
    constructor(){
    }
    setFunc(func){
        this.func = func
        return this
    }
    setParams(...params){
        this.params=params
        return this
    }

    async call(endpoint, body){

        endpoint = endpoint || ""
        body = body || {}

        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                endpoint
            },
            body: JSON.stringify(body)
        })

        if(res.ok){
            return res.json().then((res)=>{
                return {res}
            })
        }else{
            return {
                error: res.statusText,
                statusCode: res.status
            }
        }

    }
}


export default API