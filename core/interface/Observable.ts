import Observer from "./Observer";

export default interface Observable{

    register(observableObj:Observer):void;

}