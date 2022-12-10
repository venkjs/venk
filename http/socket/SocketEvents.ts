import { WebSocketServerObservable } from '../server/WebSocketServerObservable';
import { WebSocketServerObserver } from '../server/WebSocketServerObserver';
import WebSocketServerBuilder from '../server/WebSocketServerBuilder';

export function OnEvent(event:string){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        WebSocketEventBinder(event,target,propertyKey,descriptor)
    }
}

export function OnConnect(){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        WebSocketOnConnectionEventBinder(target,propertyKey,descriptor)
    }
}

export function OnDisconnect(){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        WebSocketDisconnectionEventBinder(target,propertyKey,descriptor)
    }
}

export function WebSocketEventBinder(event:string,target:any,propertyKey:string,descriptor: PropertyDescriptor,middlewares?:Array<Function>){
    console.log("Websocket event is listening "+event)
    let observer = new WebSocketServerObserver(()=>WebSocketServerBuilder.registerWebsocketEndpoint(target,propertyKey,descriptor,event,middlewares))
    WebSocketServerObservable.getInstance().register(observer)
}

export function WebSocketOnConnectionEventBinder(target:any,propertyKey:string,descriptor: PropertyDescriptor,middlewares?:Array<Function>){
    let observer = new WebSocketServerObserver(()=>WebSocketServerBuilder.registerOnConnectionEvent(target,propertyKey,descriptor,middlewares))
    WebSocketServerObservable.getInstance().register(observer)
}
export function WebSocketDisconnectionEventBinder(target:any,propertyKey:string,descriptor: PropertyDescriptor,middlewares?:Array<Function>){
    let observer = new WebSocketServerObserver(()=>WebSocketServerBuilder.registerDisconnectionEvent(target,propertyKey,descriptor,middlewares))
    WebSocketServerObservable.getInstance().register(observer)
}

