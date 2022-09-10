import Observer from "../../../core/interface/Observer";
import { RegistrationTypes } from "../../constants/RegistrationTypes";
import ContainerProvider from "../ContainerProvider";
import DependencyInjector from "../DependencyInjector";
import SingletonContainer from "../SingletonContainer";

export default class DependencyObserver implements Observer<Array<Object>>{
    private injectionMethod:Function;
    private key:any;
    private target:any;
    private name:string;

    constructor(name:string,target:any,key:any,injectionMethod:Function){
        this.name=name;
        this.injectionMethod = injectionMethod;
        this.target=target;
        this.key=key
    }

    notify(objects:Array<Object>): void {
        let isExist=false
        objects.forEach(object=>{
            if(object === this.name){
                console.log("notified")
                isExist=true
            }
        }) 
        if(isExist){
            let obj =(<SingletonContainer>ContainerProvider.getContainer(RegistrationTypes.SINGLETON)).getByType(this.name).getObject()
            this.injectionMethod.call(this.injectionMethod,obj,this.target,this.key)
            DependencyInjector.getInstance().unregister(this)
        }
    }
}