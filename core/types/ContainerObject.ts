export default class ContainerObject{
    private objectName:string;
    private object:Object;
    constructor(objectName:string,objectConstructor:Function){
        this.objectName=objectName;
        this.initiliazeObject(objectConstructor);
    }

    private initiliazeObject(objectConstructor:Function & any){
        this.object=new objectConstructor();
    }   

    public getName(){
        return this.objectName;
    }

    public getObject(){
        return this.object;
    }

}