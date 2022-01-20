export interface parametrizacion {
id?:number;
descripcion?:string;
}


export interface concepto {
  conc_id?: number;
  conc_prefijo?: number;
  conc_correlativo?:number;
  conc_descripcion?:string;
  conc_abreviatura?:string;
}
export class parametro {
  para_id?: number;
  para_prefijo?: number;
  para_correlativo?: number;
  para_int1?: number;
  para_int2?: number;
  para_cadena1?: string;
  para_cadena2?: string;
  para_fecha1?: string;
  para_fecha2?: string;
  para_marcado?:number;
}
