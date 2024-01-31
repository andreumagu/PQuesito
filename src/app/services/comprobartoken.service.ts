import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComprobartokenService {
  private url = 'http://10.116.0.219:8080/WS/jwt/tokens-api/comprobartoken.php';
  constructor(private httpClient: HttpClient) { }

  comprobar(token: string) : Observable<any> {
    const header = new Headers({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.post(this.url, header);
  }
}
