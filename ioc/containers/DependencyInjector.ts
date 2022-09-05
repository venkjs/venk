import Observable from "../../core/interface/Observable";
import Observer from "../../core/interface/Observer";
import ConsoleLogger from "../../core/logger/ConsoleLogger";

export default class DependencyInjector implements Observable{
    private observerList:Array<Observer>;
    private classNameList = new Array<string>();
    private static instance:DependencyInjector;

    private constructor(){
        this.observerList = new Array<Observer>();
        this.classNameList = new Array<string>();
    }

    register(observableObj:Observer){
        this.observerList.push(observableObj);
    }

    unregister(observer:Observer){
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