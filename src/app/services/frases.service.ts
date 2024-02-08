import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrasesService {

  private url = 'http://10.116.0.219:8888/WS/wsprueba/frases.php';

  constructor(private http: HttpClient) { }

    obtenerFraseAleatoria(): Observable<any> {
        return this.http.get<any>(this.url);
    }


}
