export class Marcador{
public lat: number =0;
public lng: number = 0;

public titulo = 'Dirección:';
public desc = '';



constructor ( lat:number, lng:number){
    this.lat = lat;
    this.lng = lng;
}
}
