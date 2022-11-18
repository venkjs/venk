import { REQUEST_MAPPING_METHODS_SYMBOL } from './../constants/PrototypeConstants';
export function Controller(path:string){
    
    return function (ctr:Function){
        let requestMappingMethods =  <Map<string,Function>> ctr.prototype[REQUEST_MAPPING_METHODS_SYMBOL]
        if(requestMappingMethods==null) return
        requestMappingMethods.forEach((func,name)=>{
            func.call(func,path)
        })
    }
    
}