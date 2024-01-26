import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private url = 'http://10.116.0.219:8080/wsprueba/wsprueba.php';


  constructor(private httpClient: HttpClient) { }

  getDatos(email: string | null):Observable<Usuario>{

    return this.httpClient.get<Usuario>(this.url + '?email=' + email);

  }


}
