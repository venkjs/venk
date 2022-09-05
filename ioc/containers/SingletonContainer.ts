import Container from "../../core/interface/Container";
import ContainerObject from "../types/ContainerObject";

export default class SingletonContainer implements Container{
    private containerObjects:Array<ContainerObject>;

    public constructor(){

    }

    public register(containerObject:ContainerObject):any{
        if(this.containerObjects==null || this.containerObjects==undefined){
            this.containerObjects = new Array<ContainerObject>();
        }
        this.containerObjects.push(containerObject);
    }

    public getByType(name:string){
        let filteredContainerObjects = this.containerObjects.filter(object=>object.getName()==name)
        return filteredContainerObjects[0]
    }
    
}