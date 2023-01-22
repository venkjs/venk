# Venk.js
Venk.js is an Express.js and Typescript based application framework that allows you to develop annotation based restful APIs like in SpringBoot 

## **Installation**
You can install module through npm. In order to install, Node.js must be installed on your system.
```
$ npm install venk
```
## **Configurations**
For building your application, you have to use these properties on your tsconfig.json file. 
enabling experimentalDecorators property will allow you to use decorators in your project.
Also, strictPropertyInitialization is disabled for dependency injection. and emitDecoratorMetadata is used to enable emitting metadata for decorators. 
```json
{
  "compilerOptions": {
                   
    "target": "es5",
    "module": "commonjs",
    "strict": true,              
    "strictPropertyInitialization": false,      
    "esModuleInterop": true,                       
    "experimentalDecorators": true,           
    "emitDecoratorMetadata": true,            
    "skipLibCheck": true,                          
    "forceConsistentCasingInFileNames": true       
  }
}
```

### **Define component for dependency injection**
In Venk framework, you can easily define a component using @Component() decorator. This decorator creates an instance for dependency injection.
```javascript
@Component()
export default class ClassB{

}
```


### **Field Injection**
For now, Venk only supports field injection using Autowired decorator. In the future, construction based injection will be supported.
```javascript
@Component()
export default class ClassA{
    
    public test():String{
        return "test"
    }

}
```

```javascript
@Component()
export default class ClassB{
    @Autowired()
    private classA:ClassA; // Instance of ClassA is injected.
}
```

### **Initializing A Web Server**
Venk framework allows you to create web api and handle web requests easily. 
The first step is creating a main file that has a main class as shown below. 

```javascript
@VenkApplication()
export class MainApplication{
    public main(){
        VenkInitiliazer.run()
    }
}
```
Default port of your Venk application is 3000. But you can change it by adding SERVER_PORT environment variable on your .env file. 
After building and running main file, VenkInitiliazer.run function will initialize a web server immeditely. 
But for invoking components, we need to import them in the main file. It doesnt matter where you are importing Components. The main purpose is invoking @Component decorators of classes.

```javascript
const Components = {
    ClassA,
    ClassB,
    ClassC
}
export {Components}
```

```javascript
@VenkApplication()
export class MainApplication{
    public main(){
        VenkInitiliazer.run(Components)
    }
}
```

### **Web Request and Response Handling**
You can easily handle http request and response using Venk's decorators. Be aware that the return type should be ResponseEntity<T> or Promise<ResponseEntity<T>> for your endpoints. 

```javascript
@Component()
export default class ClassC{

    @Autowired()
    private classA:ClassA

    @GetMapping("/api/test1")
    public test():ResponseEntity<String>{
        return ResponseEntity.status(200).body("test")
    }

    @PostMapping("/api/test2")
    public test2():ResponseEntity<Array>{
        let data = this.classA.test()
        return ResponseEntity.status(HttpStatus.OK).body(data)
    }
    
}
```

### **Handling Request Params and Body**

```javascript 
@Component()
export default class ClassC{

    @GetMapping("/api/test2")
    public test2(@RequestParam() parameter:String):ResponseEntity<String>{
        let testParam = `Hello ${parameter}`
        return ResponseEntity.status(HttpStatus.OK).body(testParam)
    }
}
```
Calling /api/test2?parameter=test endpoing will return "Hello test" with status code 200. If request does not inckudes the parameter, Venk.js will return a response with status code 400 (HTTP Bad Request).

Also @RequestBody decorator can be used for handling request body.


## **Accessing Express Request and Response**

Venk.js allows you to access http request and response objects using decorators. You can use @HttpRequest and @HttpResponse decorators for this purpose.

```javascript
import { CarService } from './../service/CarService';
import { HttpResponse,HttpRequest, Request,Response } from 'venk';
import {GetMapping,Autowired ,ResponseEntity,Component, RequestParam, } from "venk"

@Component()
export class CarApi{

    @Autowired()
    private carService:CarService

    @GetMapping("/api/cars")
    public getAllCars(@HttpRequest() req:Request , @HttpResponse() res:Response):ResponseEntity<Array>{
        let cars = this.carService.getAllCars()
        return ResponseEntity.status(200).body(cars)
    }

}
```

## **Using Middleware for Endpoints**

You can easily use your middlewares in your api endpoints. The first thing to do is creating a static function that takes 3 arguments (Request, Response and NextFunction). Note that you should call next() function in your middleware. Otherwise, the endpoint will not return your responseç

```javascript
import { Request, Response } from "venk";

export default class CarApiMiddlewares{

    static checkParams(req:Request,res:Response,next:Function){
        // Write your logics here
        next() //Call express' NextFunction method
    }

}
```
After that, you can pass your middlewares to the corresponding Http mapping decorator as shown below. 
```javascript
    @GetMapping("/api/cars",[CarApiMiddlewares.checkParams])  //Middleware function is passed in array
    public getAllCars(@RequestParam() param:string):ResponseEntity<Array<String>>{
        let cars = this.carService.getAllCars()
        console.log(param)
        return ResponseEntity.status(200).body(cars)
    }
```

  ## **Using Aspects**
  You can define aspect functions which are executed before ,after or around any function. The target class must have @Workable decorator in order to use aspects for it. Workable decorator will define a unique id for the target class.  
  ```javascript
  @Workable()
  @Component()
  export class NameService{
      public getNames(){
          return ["Hello","World"]
      }
  }
  ```
After that you can define your aspect functions as shown below.

```javascript
  export class AspectTest{
  
    @After(NameService,"get*")
    public  testAfter(JoinPoint:JoinPoint){
        console.log(JoinPoint)
        return "Hello world"
    }
}

  ```
  @After decorator indicated testAfter method will be executed after any method which is starting with "get". Aspect decorators takes 2 arguments, the first one is a workable class, and the second one is a wilcard for indicating target methods.
  
  
  
  # **Web Socket**
  In venk.js, you can easily do socket programming using decorators. 
  As you see on following example code, events are listened using decorators. @OnConnect decorator implies the function will be triggered when connection is created, and @OnDisconnect decorator will make the function to be triggered when user disconnects. 
  Also, the function that is decorated by @OnEvent("test") will be triggered when user emits an event called "test".
  
```javascript 
export class WebSocketTest{
  
    @OnConnect()
    public onConnection(){
        console.log("On Connection Function is running")
    }

    @OnDisconnect()
    public onDisconnection(){
        console.log("On Disconnect Function is running")
    }

    @OnEvent("test")
    public test(socket:Socket){

    }

    @OnEvent("test2")
    public test2(){
        console.log("test2")
    }

    
}
```
