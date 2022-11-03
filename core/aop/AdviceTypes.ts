


export class FunctionContextBase<T>{
    private _target: Function;
    private _type: T;
    private _name: String;
    private _uuid:string
    constructor(name:String,target:Function,type:T) {
        this.name=name;
        this.target=target;
        this.type=type
    }

    public get target(): Function {
        return this._target;
    }
    public set target(value: Function) {
        this._target = value;
    }
    public get type(): T {
        return this._type;
    }
    public set type(value: T) {
        this._type = value;
    }
    public get name(): String {
        return this._name;
    }
    public set name(value: String) {
        this._name = value;
    }
    public get uuid(): string {
        return this._uuid;
    }
    public set uuid(value: string) {
        this._uuid = value;
    }
}

export class AdviceFunction extends FunctionContextBase<AdviceType>{
    constructor(uuid:string,name:String,target:Function,type:AdviceType) {
        super(name,target,type)
        this.uuid=uuid
    }
}

export class FunctionContext extends FunctionContextBase<FunctionType>{
    constructor(name:String,target:Function,type:FunctionType) {
        super(name,target,type)
    }
}


export const enum AdviceType{
    BEFORE,
    AFTER,
    AROUND
}

export const enum FunctionType{
    WORKABLE_FUNCTION
}

export class JoinPoint{
    private _arguments: Object[];
    private _response: Object;

    public get arguments(): Object[] {
        return this._arguments;
    }
    public set arguments(value: Object[]) {
        this._arguments = value;
    }
    public get response(): Object {
        return this._response;
    }
    public set response(value: Object) {
        this._response = value;
    }

}