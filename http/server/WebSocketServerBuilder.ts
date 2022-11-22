import { SocketProvider } from './SocketProvider';
import { ServerProvider } from './ServerProvider';
export default class WebSocketServerBuilder {

    public static registerWebsocketEndpoint(target:any,propertyKey:string,descriptor:PropertyDescriptor,event:string,middlewares?:Array<Function>){
        console.log("registred socket event "+event)
        SocketProvider.getApp().on("connection",()=>{
            SocketProvider.getSocket().on(event,()=>{
                
                this.callSocketMethod(target,propertyKey,descriptor)
            })
        })


    }
    
    public static callWsFunction(target:any,propertyKey:string,descriptor:PropertyDescriptor){
        let method = descriptor.value;
        descriptor.value =async function () {
            return method.call(target);
        }
        return method
    }

    public static callSocketMethod(target:any,propertyKey:string,descriptor:PropertyDescriptor){
        let previousMethodDefinition = this.callWsFunction(target,propertyKey,descriptor)
        descriptor.value.call(target)
        descriptor.value=previousMethodDefinition;
    }

}