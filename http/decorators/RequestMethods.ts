import { REQUEST_MAPPING_METHODS_SYMBOL } from './../constants/PrototypeConstants';
import { InvalidReturnTypeError } from './../errors/InvalidReturnTypeError';
import { ResponseEntity } from "../api/ResponseEntity"
import { HttpMethod } from "../constants/HttpConstants"
import HttpServerBuilder from "../server/HttpServerBuilder"
import HttpServerObservable from "../server/HttpServerObservable"
import HttpServerObserver from "../server/HttpServerObserver"
import "reflect-metadata"



export function PostMapping(path:string){
    return RequestMapping(path,HttpMethod.POST)
}

export function GetMapping(path:string,middlewares?:Array<Function>){
    return RequestMapping(path,HttpMethod.GET,middlewares)
}

export function PutMapping(path:string,middlewares?:Array<Function>){
    return RequestMapping(path,HttpMethod.PUT,middlewares)
}

export function DeleteMapping(path:string,middlewares?:Array<Function>){
    return RequestMapping(path,HttpMethod.DELETE,middlewares)
}

export function PatchMapping(path:string,middlewares?:Array<Function>){
    return RequestMapping(path,HttpMethod.PATCH,middlewares)
}

export function RequestMapping(path:string,method:HttpMethod,middlewares?:Array<Function>){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        const returnType = Reflect.getMetadata('design:returntype', target, propertyKey)
        console.log(returnType.name)
        if(returnType==undefined || (returnType.name != "ResponseEntity" && returnType.name!="Promise")){
            throw new InvalidReturnTypeError(`Return type must be ResponseEntity or Promise<ResponseEntity<T>> for function : ${propertyKey}`)
        }
        const requestBindingMethod = (controllerPath:string)=>{
            if(controllerPath==null) controllerPath=""
            HttpRequestBinder(controllerPath+path,target,propertyKey,descriptor,method,middlewares)
        }
        target[REQUEST_MAPPING_METHODS_SYMBOL] = target[REQUEST_MAPPING_METHODS_SYMBOL] || new Map()
        target[REQUEST_MAPPING_METHODS_SYMBOL].set(propertyKey,requestBindingMethod)
    }
}

export function HttpRequestBinder(path:string,target:any,propertyKey:string,descriptor: PropertyDescriptor,method:HttpMethod,middlewares?:Array<Function>){
    let observer = new HttpServerObserver(()=>HttpServerBuilder.registerEndpoint(target,propertyKey,descriptor,path,method,middlewares))
    HttpServerObservable.getInstance().register(observer)
}