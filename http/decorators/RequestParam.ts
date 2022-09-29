import { RequestArgumentType } from "../constants/HttpConstants"
import ObjectReflection from "./reflect/ObjectReflection"

export function RequestParam(paramKey?:string){
    
    return function(target: Object,
        propertyKey: string | symbol,
        parameterIndex: number){
            ObjectReflection.addReflection(RequestArgumentType.REQUEST_PARAM,paramKey,target,propertyKey,parameterIndex)
        }

}

export function RequestBody(){
    return function(target: Object,
        propertyKey: string | symbol,
        parameterIndex: number){
            ObjectReflection.addReflection(RequestArgumentType.REQUEST_BODY,null,target,propertyKey,parameterIndex)
        }
}

export function PathVariable(variableName?:string){
    return function(target: Object,
        propertyKey: string | symbol,
        parameterIndex: number){
            ObjectReflection.addReflection(RequestArgumentType.PATH_VARIABLE,variableName,target,propertyKey,parameterIndex)
        }
}

