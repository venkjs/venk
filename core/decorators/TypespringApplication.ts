export function TypespringApplication(){

    return function(ctr:any){
        let application = new ctr()
        application.main()
    }
}