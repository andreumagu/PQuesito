import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private url = 'http://10.116.0.219:8080/WS/wsprueba/wsprueba.php';


  constructor(private httpClient: HttpClient) { }

  getDatos(correo: string):Observable<any>{
    const body = {
      email: correo
    }
    return this.httpClient.post(this.url, body);

  }


}
