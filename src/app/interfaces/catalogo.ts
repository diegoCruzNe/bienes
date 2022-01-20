export interface listCatalogo
{
  id?:number;
  cate_id?:number;
  cate_nombre?:string;
  imagen?:number;
  distrito?: string;
  caracteristicas:caracteristicas[],
  codigo?:number;
  mensaje?: string;

}

export interface caracteristicas{
  cara_tipo?: number;
  cara_nombre?: string;
  detalle?: string;
}
export interface archivo{
  nombre?:string;
}
export interface imagenes{
  id?:number;
  flag?:number;
  src?:string;
}
export interface filtrocatalogo{
  idregion?:string;
  idciudad?:string;
  iddistrito?:string;
  idtipoinmueble?:string;
  nrohabitacion?:string;
  nrobanios?:string;
  preciomin?:string;
  preciomax?:string;
  tamanmin?:string;
  tamanmax?:string;
}
