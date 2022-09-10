import Observer from "./Observer";

export default interface Observable<T>{

    register(observableObj:Observer<T>):void;

}