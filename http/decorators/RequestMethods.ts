import { HttpMethod } from "../constants/HttpConstants"
import HttpServerBuilder from "../server/HttpServerBuilder"

export function PostMapping(path:string){
    return RequestMapping(path,HttpMethod.POST)
}

export function GetMapping(path:string){
    return RequestMapping(path,HttpMethod.GET)
}

export function RequestMapping(path:string,method:HttpMethod){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        HttpRequestBinder(path,target,propertyKey,descriptor,method)
    }
}

export function HttpRequestBinder(path:string,target:any,propertyKey:string,descriptor: PropertyDescriptor,method:HttpMethod){
    HttpServerBuilder.registerEndpoint(target,propertyKey,descriptor,path,method)
}