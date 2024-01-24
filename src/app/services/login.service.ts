import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 //private url = 'http://localhost:8080/signin.php';
   private url = 'http://10.116.0.219/jwt-server/tokens-api/signin.php'

  /* Creamos una instancia (objeto) de la clase HTTPCLIENT para poder obtener la información los parámetros
  de la Url que pasamos posteriormente
   */
  constructor(private httpClient: HttpClient) { }

  // Función para invocar la url (servidor) en sí
  getToken(jsonData: string) : Observable<any> {
   return this.httpClient.post(this.url, {json: jsonData});
  }

}
