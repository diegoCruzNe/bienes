import { Departamento } from "./departamento";
import { Distrito } from "./distrito";

export class Provincia{
    prov_id:number = 0;
    prov_codigo:String  = "";
    prov_nombre:String = "";
    prov_estado:number =0;
    depa_id:number=0;
    departamento:Departamento[] =[]
}