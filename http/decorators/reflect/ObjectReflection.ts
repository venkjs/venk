import { RequestArgumentType, REQUEST_ARGUMENT } from "../../constants/HttpConstants";


export default class ObjectReflection{

    public static addReflection(argumentType:RequestArgumentType,metadataKey:string,target: Object, propertyKey: string | symbol, parameterIndex: number){
        let existingRequiredParameters: Map<number,RequestArgumentInformation> = Reflect.getOwnMetadata(REQUEST_ARGUMENT, target, propertyKey) || new Map() ;
        existingRequiredParameters.set(parameterIndex,new RequestArgumentInformation(argumentType,metadataKey));
        Reflect.defineMetadata( REQUEST_ARGUMENT, existingRequiredParameters, target, propertyKey);
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