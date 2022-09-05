import Container from '../../core/interface/Container';
import { RegistrationTypes } from './../constants/RegistrationTypes';
import ContainerFactory from './ContainerFactory';
export default class ContainerProvider{
    private static containers:Map<RegistrationTypes,Container>;

    public static getContainer(type:RegistrationTypes):Container{
        if(this.containers == null || this.containers==undefined){
            this.containers=new Map<RegistrationTypes,Container>();
        }
        if(!this.containers.has(type) || this.containers.get(type)==undefined){
            this.containers.set(type,ContainerFactory.getContainer(type) )
        }
        let container:Container =  <Container> this.containers.get(type);
        return container
    }


}
