import express,{ Express } from 'express';
import * as dotenv from "dotenv";
import HttpServerObservable from './HttpServerObservable';

export default class ServerProvider{
    private static app:Express;

    public static init(){
        if(!this.app){
            dotenv.config()
            const port = process.env.server_port || 3000
            const useJson = process.env.use_json || true
            this.app=express()
            if(useJson){
                this.app.use(express.json())
            }
            try{
                this.app.listen(port,()=>{
                    console.log(`Application is running on port ${port}`)
                    HttpServerObservable.getInstance().setServerStatus(true)
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
    
}