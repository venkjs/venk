import Observable from "../../core/interface/Observable";
import Observer from "../../core/interface/Observer";

export class ServerObservableBase implements Observable<Observer<Object>> {
    private requestBinderList:Array<Observer<Object>>
    private serverStatus:Boolean;

    public constructor(){
        this.requestBinderList = new Array<Observer<Object>>()
        this.serverStatus =false

    }

    public register(requestBinder:Observer<Object>){
        this.requestBinderList.push(requestBinder)
    }

    public setServerStatus(status:Boolean){
        this.serverStatus=status;
        this.notifyAll()
    }

    private notifyAll(){
        this.requestBinderList.map((requestBinder)=>{
            requestBinder.notify(this.serverStatus)
        })
    }


}