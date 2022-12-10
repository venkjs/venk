import HttpServerObserver from "./HttpServerObserver";

export class WebSocketServerObserver extends HttpServerObserver{

    constructor(binderMethod:Function){
        super(binderMethod)
    }
    
}