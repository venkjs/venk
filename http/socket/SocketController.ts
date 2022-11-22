import { SOCKET_MAPPING_METHODS_SYMBOL } from './../constants/PrototypeConstants';
export function SocketController(path:string,middlewares?:Array<Function>){
    
    return function (ctr:Function){
        let requestMappingMethods =  <Map<string,Function>> ctr.prototype[SOCKET_MAPPING_METHODS_SYMBOL]
        if(requestMappingMethods==null) return
        requestMappingMethods.forEach((func,name)=>{
            func.call(func,path,middlewares)
        })
    }
    
}