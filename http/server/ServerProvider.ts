import { Http2SecureServer } from 'http2';
import { SocketProvider } from './SocketProvider';
import express,{ Express } from 'express';
import * as dotenv from "dotenv";
import HttpServerObservable from './HttpServerObservable';
import cors from 'cors'
import http, { Server } from 'http'

export class ServerProvider{
    private static app:Express;
    private static server:Server
    public static init(...args:any){
        if(!this.app){
            dotenv.config()
            const port = process.env.server_port || 3000
            const useJson = process.env.use_json || true
            const useCors = process.env.use_cors || false
            this.app=express()

            if(useCors){
                this.app.use(cors())
            }
            if(useJson){
                this.app.use(express.json())
            }
            try{
                this.server = http.createServer(ServerProvider.getServer())
                this.server.listen(port,()=>{
                    console.log(`Application is running on port ${port}`)
                    HttpServerObservable.getInstance().setServerStatus(true)
                    SocketProvider.init()
                })
            }catch(e){
                HttpServerObservable.getInstance().setServerStatus(false)
                throw e
            }

        }else{
            console.log("Server is already initiliazed....")
        }

    }
    
    public static getServer():Express{
        return this.app
    }
    
    public static getHttpServer():Server{
        return this.server
    }

}