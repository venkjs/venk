import { HttpStatus } from "../constants/HttpConstants";

export class HttpError extends Error{
    private status:number
    constructor(message:string|undefined,status:number){
        super(message)
        this.status=status;
        Object.setPrototypeOf(this,HttpError.prototype)
    }
    public getStatus(){
        return this.status
    }
}

export class BadRequestError extends HttpError{
    constructor(message:string|undefined){
        super(message,HttpStatus.BAD_REQUEST)
        Object.setPrototypeOf(this,BadRequestError.prototype)
    }
}