import ContainerObject from "../../ioc/types/ContainerObject";

export default interface Container{
    
     register(object:ContainerObject):any;

}