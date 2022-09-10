import Observer from "../../core/interface/Observer";

export default class HttpServerObserver implements Observer<Object>{
    private binderMethod:Function;
    constructor(binderMethod:Function){
        this.binderMethod=binderMethod
    }
    public notify(object: Function): void {
        this.binderMethod.call(this.binderMethod)
    }

}