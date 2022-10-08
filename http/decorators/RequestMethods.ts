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

export function GetMapping(path:string){
    return RequestMapping(path,HttpMethod.GET)
}

export function PutMapping(path:string){
    return RequestMapping(path,HttpMethod.PUT)
}

export function DeleteMapping(path:string){
    return RequestMapping(path,HttpMethod.DELETE)
}

export function PatchMapping(path:string){
    return RequestMapping(path,HttpMethod.PATCH)
}

export function RequestMapping(path:string,method:HttpMethod){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        const returnType = Reflect.getMetadata('design:returntype', target, propertyKey)
        if(returnType==undefined || returnType.name != "ResponseEntity"){
            throw new InvalidReturnTypeError(`Return type must be ResponseEntity for function : ${propertyKey}`)
        }
        HttpRequestBinder(path,target,propertyKey,descriptor,method)
    }
}

export function HttpRequestBinder(path:string,target:any,propertyKey:string,descriptor: PropertyDescriptor,method:HttpMethod){
    let observer = new HttpServerObserver(()=>HttpServerBuilder.registerEndpoint(target,propertyKey,descriptor,path,method))
    HttpServerObservable.getInstance().register(observer)
}