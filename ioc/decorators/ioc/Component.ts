import { RegistrationTypes } from "../../constants/RegistrationTypes"
import ContainerProvider from "../../containers/ContainerProvider"
import DependencyInjector from "../../containers/DependencyInjector"
import ContainerObject from "../../types/ContainerObject"

export function Component(){
    return function (ctr:Function){
        let containerObject = new ContainerObject(ctr.name,ctr)
        ContainerProvider.getContainer(RegistrationTypes.SINGLETON).register(containerObject)
        DependencyInjector.getInstance().insertObject(containerObject.getName())
    }
}