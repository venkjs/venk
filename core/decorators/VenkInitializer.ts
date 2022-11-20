import {ServerProvider} from "../../http/server/ServerProvider";

export class VenkInitiliazer{

    public static run(...args:any){
      ServerProvider.init(...args)
    }
    
}