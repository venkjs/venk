import Observable from "../../core/interface/Observable";
import Observer from "../../core/interface/Observer";

export default class HttpServerObservable implements Observable<Observer<Object>>{
    private requestBinderList:Array<Observer<Object>>
    private static instance:HttpServerObservable;
    private serverStatus:Boolean;

    private constructor(){
        this.requestBinderList = new Array<Observer<Object>>()
        this.serverStatus =false
    }

    public register(requestBinder:Observer<Object>){
        this.requestBinderList.push(requestBinder)
    }

    public setServerStatus(status:Boolean){
        this.serverStatus=true;
        this.notifyAll()
    }

    private notifyAll(){
        this.requestBinderList.map((requestBinder)=>{
            requestBinder.notify(this.serverStatus)
        })
    }

    public static getInstance():HttpServerObservable{
        if(this.instance == null){
            this.instance = new HttpServerObservable();
        }
        return this.instance;
    }

}