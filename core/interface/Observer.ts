export default interface Observer<T>{

    notify(object:T):void;
    
}