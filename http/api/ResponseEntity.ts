export default class ResponseEntity<T>{

    private status:number;
    private responseBody:any;
    
    private constructor(status:number){
        this.status=status
    }

    public static status<T>(status:number):ResponseEntity<T>{
        return new ResponseEntity<T>(status)
    }

    public body(body:T):any{
        this.responseBody=body
        return this
    }

    public getStatus(){
        return this.status
    }

    public getBody(){
        return this.responseBody
    }
    


}