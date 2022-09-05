import Logger from "./Logger";

export default class ConsoleLogger implements Logger{
    public log(arg:any):any{
        console.log(arg)
    }
}