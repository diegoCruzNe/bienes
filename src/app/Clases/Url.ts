import { GLOBAL, GLOBAL_IMAGEN, GLOBAL_CATALGO, GLOBAL_UBIGEO } from '../Service/global';

export class Url {

  public static URL_ADMINISTRACION: string = GLOBAL.host + GLOBAL.port;
  public static URL_ADMINISTRACION_IMAGEN: string = GLOBAL_IMAGEN.host + GLOBAL_IMAGEN.port;
  public static URL_ADMINISTRACION_CATALOGO: string = GLOBAL_CATALGO.host + GLOBAL_CATALGO.port;
  public static URL_ADMINISTRACION_UBIGEO: string = GLOBAL_UBIGEO.host + GLOBAL_UBIGEO.port;

  constructor() { }

}
