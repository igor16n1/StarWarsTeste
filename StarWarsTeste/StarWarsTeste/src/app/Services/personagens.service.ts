import { environment } from './../../environments/environment.prod';
import { ILista } from './../Interfaces/ilista';
import { IPersonagem } from './../Interfaces/ipersonagem';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonagensService {

  controller: string = 'people/';

  constructor(private http: HttpClient) { }

  ConsultarPersonagens(): Observable<ILista> {
    return this.http.get<ILista>(environment.apiURL + '/' + this.controller);
  }  
  ConsultarPersonagensPagina(url: string): Observable<ILista> {
    return this.http.get<ILista>(url);
  }
  ConsultarPersonagem(url: string): Observable<IPersonagem> {
    return this.http.get<IPersonagem>(url);
  }  
}
