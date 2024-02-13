import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private url = 'http://10.116.0.219:8888/WS/php-excel/readexcel.php';
  private url1 = 'http://10.116.0.219:8888/WS/php-excel/mediasexcel.php';



  constructor(private httpClient: HttpClient) { }


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
