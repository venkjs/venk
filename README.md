# Typespring
TypeSpring is an Express.js and Typescript based application framework that allows you to develop annotation based restful APIs like in SpringBoot 

## **Installation**
You can install module through npm. In order to install, Node.js must be installed on your system.
```
$ npm install @springts/typespring
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
In Typespring framework, you can easily define a component using @Component() decorator. This decorator creates an instance for dependency injection.
```javascript
@Component()
export default class ClassB{

}
```


### **Field Injection**
For now, Typespring only supports field injection using Autowired decorator. In the future, construction based injection will be supported.
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
Typespring framework allows you to create web api and handle web requests easily. 
The first step is creating a main file that has a main class as shown below.

```javascript
@TypespringApplication()
export class MainApplication{
    public main(){
        TypespringInitiliazer.run()
    }
}
```
After building and running main file, TypespringInitiliazer.run function will initialize a web server immeditely. 
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
@TypespringApplication()
export class MainApplication{
    public main(){
        TypespringInitiliazer.run(Components)
    }
}
```

### **Web Request and Response Handling**
You can easily handle http request and response using typespring's decorators. Be aware that the return type should be ResponseEntity for your endpoints. 

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
Calling /api/test2?parameter=test endpoing will return "Hello test" with status code 200. If request does not inckudes the parameter, typespring will return a response with status code 400 (HTTP Bad Request).

Also @RequestBody decorator can be used for handling request body.


## **Accessing Express Request and Response**

Typespring allows you to access http request and response objects using decorators. You can use @HttpRequest and @HttpResponse decorators for this purpose.

```javascript
import { CarService } from './../service/CarService';
import { HttpResponse,HttpRequest, Request,Response } from '@springts/typespring';
import {GetMapping,Autowired ,ResponseEntity,Component, RequestParam, } from "@springts/typespring"

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







