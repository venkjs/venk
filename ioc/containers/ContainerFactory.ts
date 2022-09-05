import Container from "../../core/interface/Container";
import { RegistrationTypes } from "../constants/RegistrationTypes";
import SingletonContainer from "./SingletonContainer";

export default class ContainerFactory{

    public static getContainer(type:RegistrationTypes):Container{
        if(type==RegistrationTypes.SINGLETON){
            return new SingletonContainer();
        }
        return new SingletonContainer();
    }


}