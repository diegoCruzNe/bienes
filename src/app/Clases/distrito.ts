import { Provincia } from "./provincia";

export class Distrito{
    dist_id:number=0;
    dist_codigo:String="";
    dist_nombre:String="";
    dist_estado:number=0;
    prov_id:number=0;
    provincia:Provincia[] =[];

}