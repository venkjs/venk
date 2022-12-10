import { SocketProvider } from './SocketProvider';
import { ServerProvider } from './ServerProvider';
import { Socket } from 'socket.io';
export default class WebSocketServerBuilder {
    
    public static registerWebsocketEndpoint(target:any,propertyKey:string,descriptor:PropertyDescriptor,event:string,middlewares?:Array<Function>){
        console.log("Registered socket event "+event)
        SocketProvider.getApp().on("connection",(socket)=>{
            socket.on(event,()=>{
                this.callSocketMethod(target,propertyKey,descriptor,socket)
            })
        })
    }

    public static registerOnConnectionEvent(target:any,propertyKey:string,descriptor:PropertyDescriptor,middlewares?:Array<Function>){
        SocketProvider.getApp().on("connection",(socket)=>{
            this.callSocketMethod(target,propertyKey,descriptor,socket)
        })
    }

    public static registerDisconnectionEvent(target:any,propertyKey:string,descriptor:PropertyDescriptor,middlewares?:Array<Function>){
        SocketProvider.getApp().on("connection",(socket)=>{
            socket.on("disconnect",(e)=>{
                this.callSocketMethod(target,propertyKey,descriptor,socket)
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

    public static callSocketMethod(target:any,propertyKey:string,descriptor:PropertyDescriptor,socket:Socket){
        let previousMethodDefinition = this.callWsFunction(target,propertyKey,descriptor)
        descriptor.value.call(target,socket)
        descriptor.value=previousMethodDefinition;
    }

}