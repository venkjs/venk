import { ServerObservableBase } from './ServerObservableBase';
import HttpServerObservable from "./HttpServerObservable";

export class WebSocketServerObservable extends ServerObservableBase{
    private static instance:WebSocketServerObservable;

    private constructor(){
        super()
    }

    public static getInstance():WebSocketServerObservable{
        if(this.instance == null){
            this.instance = new WebSocketServerObservable();
        }
        return this.instance;
    }

}