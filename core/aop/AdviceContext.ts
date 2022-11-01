import { randomUUID } from 'crypto';
import { AdviceFunction, FunctionContext } from './AdviceTypes';
export class AdviceHelper{
    public static methods:Map<String,Array<AdviceFunction>>

    public static addMethod(key:String,func:AdviceFunction){
        if(this.methods==null){
            this.methods = new Map<String,Array<AdviceFunction>>()
        }
        let functionList =this.methods.get(key)
        if(functionList==null){
            functionList = new Array<AdviceFunction>()
        }
        functionList.push(func)
        console.log("Function is setted")
        this.methods.set(key,functionList)
    }

    public static getMethodListByName (name:String):Array<AdviceFunction> | undefined{
        if(this.methods==null){
            return new Array()
        }
        if(!this.methods.has(name)){
            throw new Error(`Advice not found : ${name}`)
        }
        return this.methods.get(name)
    }

}

export class WorkableClassHelper{
    private static _workableClassList :Array<WorkableClass>
    public static get workableClassList(){
        return this._workableClassList
    }
    public static add(workableClass:WorkableClass){
        if(this._workableClassList==null){
            this._workableClassList=new Array()
        }
        this._workableClassList.push(workableClass);
    }

    public static getByUUID(uuid:String){
        return this._workableClassList.filter(workableClass=>workableClass.uuid==uuid)
    }
    
}

export class WorkableClass{
    private _uuid: String;
    private _methodList: Array<FunctionContext>;
    private _name:string;
    constructor(name:string) {
        this.uuid=new String(randomUUID())
        this.methodList=new Array<FunctionContext>()
        this._name=name
    }
    public get uuid(): String {
        return this._uuid;
    }
    public set uuid(value: String) {
        this._uuid = value;
    }
    public get methodList(): Array<FunctionContext> {
        return this._methodList;
    }
    public set methodList(value: Array<FunctionContext>) {
        this._methodList = value;
    }

    public get name(){
        return this._name;
    }
    public set name(name:string){
        this._name=name
    }
    public addMethod(method:FunctionContext){
        if(this.methodList==null){
            this.methodList=new Array<FunctionContext>()
        }
        this.methodList.push(method)
    }

    public getMethodByName(methodName:String){
        return this.methodList.filter(method=>method.name==methodName)
    }

    public getMethodByRegex(regx:string){
        return this.methodList.filter(method=>{
            let reg = new RegExp(regx)
            return reg.test(<string>method.name)
        })
    }

}

