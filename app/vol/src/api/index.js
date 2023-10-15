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

    async call(endpoint){
        endpoint ||= "/"
        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                endpoint
            },
        })
        return res.json().then((res)=>{
            return res
        })
    }
}


export default API