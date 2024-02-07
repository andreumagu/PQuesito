import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private url = 'http://10.116.0.219:8888/WS/php-excel/readexcel.php';


  constructor(private httpClient: HttpClient) { }


  getDatos(modul: string, ano: string, id: string):Observable<Usuario>{

    const token = localStorage.getItem('token');

    const header = new Headers({
      'Authorization': `Bearer ${token}`
    })

    const body = {
      "modul": modul,
      "ano": ano,
      "id": id
    };

    return this.httpClient.post<Usuario>(this.url, body);

  }


}
