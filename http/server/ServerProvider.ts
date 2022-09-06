import express,{ Express } from 'express';
import * as dotenv from "dotenv";

export default class ServerProvider{
    private static app:Express;

    public static init({useJson=true}){
        if(!this.app){
            dotenv.config()
            const port = process.env.server_port
            this.app=express()
            if(useJson){
                this.app.use(express.json())
            }
            this.app.listen(port,()=>{
                console.log(`Application is running on port ${port}`)
            })
        }else{
            console.log("Server is already initiliazed....")
        }

    }
    
    public static getServer():Express{
        return this.app
    }
    
}