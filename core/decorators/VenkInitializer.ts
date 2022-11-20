import {ServerProvider} from "../../http/server/ServerProvider";

export class TypespringInitiliazer{

    public static run(...args:any){
      ServerProvider.init(...args)
    }
    
}