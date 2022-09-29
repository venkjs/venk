import 'reflect-metadata'
import DependencyObserver from '../../containers/dependency/DependencyObserver';
import DependencyInjector from '../../containers/DependencyInjector';

export function Autowired(name=""):(target: any, key: string) => void{
    return (target:any, key:string): void => {
        
        var t = Reflect.getMetadata("design:type", target, key);
        var beanName;
        if(t==undefined){
            beanName=name
        }else{
            beanName=t.name
        }
        let dependencyObserver =new DependencyObserver(beanName.trim(),target,key,(injectedObject:any,t:any,k:any)=>{

            Object.defineProperty(t, k, {
                get: function() {
                    return injectedObject;
                },
                set: function(value) {
                }
            })
        });
        DependencyInjector.getInstance().register(dependencyObserver)
    
      };


}

