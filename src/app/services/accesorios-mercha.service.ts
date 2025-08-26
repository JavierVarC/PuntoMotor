import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccesoriosMerchaService {
  private jsonUrl = 'assets/accesorios_json/AccesoriosMercha.json';

  constructor(private http: HttpClient) {}

  getAccesorios(): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => data.accesorios)
    );

  }

  getMerchandise(): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => data.merchandise)
    );
  }
}
