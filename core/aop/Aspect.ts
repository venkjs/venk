import { randomUUID } from 'crypto';
import { AdviceType, AdviceFunction, JoinPoint, FunctionContext, FunctionType } from './AdviceTypes';
import { AdviceHelper, WorkableClass, WorkableClassHelper } from './AdviceContext';

export function After(targetClass:new () => Object ,regex:string){
    return Advice(targetClass,regex,AdviceType.AFTER)
}

export function Before(targetClass:new () => Object ,regex:string){
    return Advice(targetClass,regex,AdviceType.BEFORE)
}

export function Around(targetClass:new () => Object ,regex:string){
    return Advice(targetClass,regex,AdviceType.AROUND)
}

export function Advice(targetClass:new () => Object ,regex:string,adviceType:AdviceType){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        let uuid = targetClass.prototype.WORKABLE_CLASS_UUID
        if(uuid==null){
            throw new Error("Target must have @Workable decorator in order to use aspect functions")
        }
        let adviceFunction = new AdviceFunction(uuid,regex,(joinPoint:JoinPoint)=>descriptor.value.call(target,joinPoint),adviceType)
       AdviceHelper.addMethod(uuid,adviceFunction)
    }
}


export function Workable(){
    return function(target:Function){
        let workableClass = new WorkableClass(target.prototype.name)
        let uuid = randomUUID()
        workableClass.uuid=uuid
        Object.defineProperty(target.prototype,"WORKABLE_CLASS_UUID",{
            configurable: true,
            enumerable: true,
            writable: true,
            value: workableClass.uuid
        })
        for (const propertyName in target.prototype) {
            
            const propertyValue = target.prototype[propertyName];
            const isMethod = propertyValue instanceof Function;
            if (!isMethod)
                continue;
    
            const descriptor = getMethodDescriptor(propertyName);
            if(descriptor!=null){
                const originalMethod = descriptor.value;
                descriptor.value = function (...args: any[]) {
                    let joinPoint = new JoinPoint()
                    joinPoint.arguments = args
                    callAdviceFunctions(propertyName,uuid,joinPoint,[AdviceType.BEFORE,AdviceType.AROUND])
                    const result = originalMethod.apply(this, args);
                    joinPoint.response=result
                    callAdviceFunctions(propertyName,uuid,joinPoint,[AdviceType.AFTER,AdviceType.AROUND])
                    
                    return result;
                };
        
                Object.defineProperty(target.prototype, propertyName, descriptor);   
            }
        }
        WorkableClassHelper.add(workableClass)
        function getMethodDescriptor(propertyName: string): TypedPropertyDescriptor<any>|undefined {
            if (target.prototype.hasOwnProperty(propertyName))
                return Object.getOwnPropertyDescriptor(target.prototype, propertyName);
    
            return {
                configurable: true,
                enumerable: true,
                writable: true,
                value: target.prototype[propertyName]
            };
        }
    }



}

function callAdviceFunctions(propertyName:string,uuid:string,joinPoint:JoinPoint, types:Array<AdviceType>){
    AdviceHelper.getMethodListByName(uuid)?.forEach(method=>{
        let methodName = method.name.replace('*','.*')
        let regex = new RegExp('^'+methodName+"$")
        if(types.includes(method.type) &&regex.test(propertyName)){
            method.target.call(method.target,joinPoint)
        }
    })
}