export function VenkApplication(){

    return function(ctr:any){
        let application = new ctr()
        application.main()
    }
}