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

    async call(){

        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                func:this.func,
                params: this.params,
            }),
        })
        return res.json().then((res)=>{
            if(res.error){
                throw new Error(res.msg)
            }
            if(!res.data){
                throw new Error(`Unexpected response in data: ${res.data}`)
            }
            return res.data
        })
    }
}


export default API