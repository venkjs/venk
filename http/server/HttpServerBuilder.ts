import { RequestArgumentInformation } from '../decorators/reflect/ObjectReflection';
import { Request, Response } from "express"
import { HttpMethod, RequestArgumentType, REQUEST_ARGUMENT } from "../constants/HttpConstants"
import ServerProvider from "./ServerProvider"
import ResponseEntity from '../api/ResponseEntity';

export default class HttpServerBuilder{


    public static registerEndpoint(target:any,propertyKey:string,descriptor:PropertyDescriptor,path:string,method:HttpMethod){
        if(method==HttpMethod.GET){
            this.registerGetEndpoint(target,propertyKey,descriptor,path)
        }
        if(method==HttpMethod.POST){
            this.registerPostEndpoint(target,propertyKey,descriptor,path)
        }
    }

    private static registerGetEndpoint(target:any,propertyKey:string,descriptor:PropertyDescriptor,path:string){
        ServerProvider.getServer().get(path,(req:Request,res:Response)=>{
            this.callHttpMethodAndReturnResponse(
                req,res,target,propertyKey,descriptor
            )
        })
    }

    private static registerPostEndpoint(target:any,propertyKey:string,descriptor:PropertyDescriptor,path:string){
        ServerProvider.getServer().post(path,(req:Request,res:Response)=>{
            this.callHttpMethodAndReturnResponse(
                req,res,target,propertyKey,descriptor
            )
        })
    }

    private static callHttpMethodAndReturnResponse(req:Request,res:Response,target:any,propertyKey:string,descriptor:PropertyDescriptor){
        let requestParams = this.getRequestParams(new Map(),target,propertyKey,descriptor)
        let previousMethodDefinition = this.callMethodWithParameters(req,requestParams,target,propertyKey,descriptor)
        let response :ResponseEntity<any>= descriptor.value.call(target)
        console.log(descriptor.value)
        res.status(response.getStatus())
        res.send(response.getBody())
        descriptor.value=previousMethodDefinition
    }

    private static getRequestParams(parameterMap:Map<number,any>,target:any,propertyKey:string,descriptor:PropertyDescriptor):Map<number,any>{
        let parameters:Map<number,RequestArgumentInformation>=parameterMap || new Map<number,any>()
        let requestArguments: Map<number,RequestArgumentInformation> = Reflect.getOwnMetadata(REQUEST_ARGUMENT, target, propertyKey)||new Map() ;
        console.log(requestArguments)
        requestArguments.forEach((object:RequestArgumentInformation,key:number)=>{
                parameters.set(key,object)
        })
        return parameters
    }

    private static callMethodWithParameters(req:Request,parameterMap:Map<number,RequestArgumentInformation>,target:any,propertyKey:string,descriptor:PropertyDescriptor){
        let method = descriptor.value;
        let params =new Array<any>()
        parameterMap.forEach((object,key)=>{
            if(object.type==RequestArgumentType.REQUEST_PARAM){
                params[key]=req.query[object.value]
            }
            if(object.type==RequestArgumentType.REQUEST_BODY){
                console.log(req.body)
                params[key]  = req.body
            }
        })
        console.log(parameterMap)

        descriptor.value = function () {
            return method.call(target,...params);
        }
        return method
    }


}