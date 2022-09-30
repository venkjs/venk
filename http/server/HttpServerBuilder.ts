import { HttpError } from './../errors/HttpError'; 
import { BadRequestError } from './../errors/HttpError';
import { RequestArgumentInformation } from '../decorators/reflect/ObjectReflection';
import { Request, Response } from "express"
import { HttpMethod, RequestArgumentType, REQUEST_ARGUMENT } from "../constants/HttpConstants"
import {ServerProvider} from "./ServerProvider"
import {ResponseEntity} from '../api/ResponseEntity';

export default class HttpServerBuilder{


    public static registerEndpoint(target:any,propertyKey:string,descriptor:PropertyDescriptor,path:string,method:HttpMethod){
       switch(method){
            case HttpMethod.POST:
                this.registerPostEndpoint(target,propertyKey,descriptor,path)
                break;
            case HttpMethod.GET:
                this.registerGetEndpoint(target,propertyKey,descriptor,path)
                break;
            case HttpMethod.PUT:
                this.registerPutEndpoint(target,propertyKey,descriptor,path)
                break;
            case HttpMethod.DELETE:
                this.registerDeleteEndpoint(target,propertyKey,descriptor,path)
                break;
            case HttpMethod.PATCH:
                this.registerPatchEndpoint(target,propertyKey,descriptor,path)
                break;
            default:
                throw new Error("Invalid Http Method.. Please only use GET, POST , PUT, DELETE and PATCH Methods")
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

    private static registerPutEndpoint(target:any,propertyKey:string,descriptor:PropertyDescriptor,path:string){
        ServerProvider.getServer().put(path,(req:Request,res:Response)=>{
            this.callHttpMethodAndReturnResponse(
                req,res,target,propertyKey,descriptor
            )
        })
    }

    private static registerDeleteEndpoint(target:any,propertyKey:string,descriptor:PropertyDescriptor,path:string){
        ServerProvider.getServer().delete(path,(req:Request,res:Response)=>{
            this.callHttpMethodAndReturnResponse(
                req,res,target,propertyKey,descriptor
            )
        })
    }

    private static registerPatchEndpoint(target:any,propertyKey:string,descriptor:PropertyDescriptor,path:string){
        ServerProvider.getServer().patch(path,(req:Request,res:Response)=>{
                this.callHttpMethodAndReturnResponse(
                    req,res,target,propertyKey,descriptor
                )
        })
    }

    private static handleError(e:any,req:Request,res:Response){
        if(e instanceof HttpError){
            res.status(e.getStatus()).send()
        }
    }

    private static callHttpMethodAndReturnResponse(req:Request,res:Response,target:any,propertyKey:string,descriptor:PropertyDescriptor){
        try{
            let requestParams = this.getRequestParams(new Map(),target,propertyKey,descriptor)
            let previousMethodDefinition = this.callMethodWithParameters(req,res,requestParams,target,propertyKey,descriptor)
            let response :ResponseEntity<any>= descriptor.value.call(target)
            console.log(descriptor.value)
            res.status(response.getStatus())
            res.send(response.getBody())
            descriptor.value=previousMethodDefinition
        }catch(e){
            console.log((<Error>e).message)
            this.handleError(e,req,res)
        }
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

    private static callMethodWithParameters(req:Request,res:Response,parameterMap:Map<number,RequestArgumentInformation>,target:any,propertyKey:string,descriptor:PropertyDescriptor){
        let method = descriptor.value;
        let params =new Array<any>()
        parameterMap.forEach((object,key)=>{
            if(object.type==RequestArgumentType.REQUEST_PARAM){
                if(req.query[object.value]==undefined){
                    throw new BadRequestError(`Missing Request Parameter :${object.value} `)
                }
                params[key]=req.query[object.value]
            }
            if(object.type==RequestArgumentType.REQUEST_BODY){
                if(req.body==undefined){
                    throw new BadRequestError(`Incoming request does not include a body.`)
                }
                params[key]  = req.body
            }
            if(object.type==RequestArgumentType.HTTP_REQUEST){
                params[key] = req
            }
            if(object.type==RequestArgumentType.HTTP_RESPONSE){
                params[key] = res
            }
        })

        descriptor.value = function () {
            return method.call(target,...params);
        }
        return method
    }


}