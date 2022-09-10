import Observable from "../../core/interface/Observable";
import Observer from "../../core/interface/Observer";
import ConsoleLogger from "../../core/logger/ConsoleLogger";

export default class DependencyInjector implements Observable<Object>{
    private observerList:Array<Observer<Object>>;
    private classNameList = new Array<string>();
    private static instance:DependencyInjector;

    private constructor(){
        this.observerList = new Array<Observer<Object>>();
        this.classNameList = new Array<string>();
    }

    register(observableObj:Observer<Object>){
        this.observerList.push(observableObj);
    }

    unregister(observer:Observer<Object>){
        this.observerList=this.observerList.filter(observerObject=>observer!==observerObject)
    }

    notifyAll(){
        this.observerList.forEach(observerObject=>{
            observerObject.notify(this.classNameList)
        })
    }

    insertObject(object:string){
        this.classNameList.push(object);
        this.notifyAll()
    }

    public static getInstance():DependencyInjector{
        if(this.instance==null){
            this.instance = new DependencyInjector()
        }
        return this.instance;
    }

}