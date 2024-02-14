import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private url = 'http://cicloweb.cesurformacion.com/API/php-excel/raexcel.php';
  private url1 = 'http://cicloweb.cesurformacion.com/API/php-excel/mediasexcel.php';



  constructor(private httpClient: HttpClient) { }

  getRas(modulo: string, ano: string, id: string):Observable<any>{

    const token = localStorage.getItem('token');

    // Configurar el header con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Definir el cuerpo de la solicitud
    const body = {
      "modul": modulo,
      "ano": ano,
      "id": id
    };

    // Enviar la solicitud POST con el header y el cuerpo
    return this.httpClient.post<any>(this.url, body, { headers: headers });
  }


  getMedias(ano: string, id: string):Observable<any>{

    const token = localStorage.getItem('token');

    // Configurar el header con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Definir el cuerpo de la solicitud
    const body = {
      "ano": ano,
      "id": id
    };

    // Enviar la solicitud POST con el header y el cuerpo
    return this.httpClient.post<any>(this.url1, body, { headers: headers });
  }

}
