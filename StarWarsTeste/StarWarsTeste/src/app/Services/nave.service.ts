import { INaveDTO } from './../Interfaces/inave-dto';
import { environment } from './../../environments/environment.prod';
import { ILista } from './../Interfaces/ilista';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NaveService {

  controller: string = 'starships/';

  constructor(private http: HttpClient) { }

  ConsultarNaves(): Observable<ILista> {
    return this.http.get<ILista>(environment.apiURL + '/' + this.controller);
  }  
  ConsultarNavesPagina(url: string): Observable<ILista> {
    return this.http.get<ILista>(url);
  }
  ConsultarNave(url: string): Observable<INaveDTO> {
    return this.http.get<INaveDTO>(url);
  }  
}
