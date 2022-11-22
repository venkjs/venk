import { WebSocketServerObservable } from './../server/WebSocketServerObservable';
import { WebSocketServerObserver } from './../server/WebSocketServerObserver';
import WebSocketServerBuilder from '../server/WebSocketServerBuilder';

export function OnEvent(event:string){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        WebSocketBinder(event,target,propertyKey,descriptor)
    }
}

export function WebSocketBinder(event:string,target:any,propertyKey:string,descriptor: PropertyDescriptor,middlewares?:Array<Function>){
    console.log("Websocket event is listening "+event)
    let observer = new WebSocketServerObserver(()=>WebSocketServerBuilder.registerWebsocketEndpoint(target,propertyKey,descriptor,event,middlewares))
    WebSocketServerObservable.getInstance().register(observer)
}