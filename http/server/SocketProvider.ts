import { ServerProvider } from './ServerProvider';
import { Server } from "socket.io";
import HttpServerObservable from "./HttpServerObservable";
import { WebSocketServerObservable } from "./WebSocketServerObservable";
import { Socket } from 'socket.io/dist/socket';
export class SocketProvider{
    private static app:Server
    private static socket:Socket
    public static init(...args:any){
        if(!this.app){
            try{
                this.app=new Server(ServerProvider.getHttpServer())
                WebSocketServerObservable.getInstance().setServerStatus(true)
            }catch(e){
                WebSocketServerObservable.getInstance().setServerStatus(false)
                HttpServerObservable.getInstance().setServerStatus(false)
                throw e
            }
        }else{
            console.log("Socket server is already initiliazed")
        }
    }

    public static getApp(){
        return this.app
    }
    public static getSocket(){
        return this.socket
    }
}