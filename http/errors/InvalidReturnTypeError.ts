export class InvalidReturnTypeError extends Error{
    constructor(msg:string|undefined){
        super(msg)
    }
}