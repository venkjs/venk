import { RequestArgumentType, REQUEST_ARGUMENT } from "../../constants/HttpConstants";
import 'reflect-metadata'

export default class ObjectReflection{

    public static addReflection(argumentType:RequestArgumentType,metadataKey:string|any,target: Object, propertyKey: string |symbol, parameterIndex: number){
        if(metadataKey==undefined){
            const targetFunction = this.getTargetFunction(target,propertyKey)
            const targetPropertyName = this.getTargetPropertyName(targetFunction.toString(),parameterIndex)
            metadataKey=targetPropertyName
        }
        let existingRequiredParameters: Map<number,RequestArgumentInformation> = Reflect.getOwnMetadata(REQUEST_ARGUMENT, target, propertyKey) || new Map() ;
        existingRequiredParameters.set(parameterIndex,new RequestArgumentInformation(argumentType,metadataKey));
        Reflect.defineMetadata( REQUEST_ARGUMENT, existingRequiredParameters, target, propertyKey);
    }

    private static getTargetFunction(target: Object, propertyKey: string |symbol){
        type targetKeyType = keyof typeof target
        const targetKey = propertyKey as targetKeyType
        return target[targetKey]
    }

    private static getTargetPropertyName(targetFunction:string,parameterIndex:number){
        const RegExInsideParentheses = /[(][^)]*[)]/;
        const RegExParenthesesAndSpaces = /[()\s]/g;
        let parameters = RegExInsideParentheses.exec(targetFunction)?.[0].replace(RegExParenthesesAndSpaces, "").split(',').map(str => str.trim());
        if(parameters==undefined){
            throw new Error("Parameter not found in function definition")
        }
        return parameters[parameterIndex];
    }

}


export class RequestArgumentInformation{
    type:RequestArgumentType;
    value:string
    constructor(type:RequestArgumentType,value:string){
        this.type=type;
        this.value=value
    }

}