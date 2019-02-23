import { environment } from './../../environments/environment.prod';
import { IPersonagensLista } from './../Interfaces/ipersonagens-lista';
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

  ConsultarPersonagens(): Observable<IPersonagensLista> {
    return this.http.get<IPersonagensLista>(environment.apiURL + '/' + this.controller);
  }
  ConsultarPersonagem(id: number): Observable<IPersonagem> {
    return this.http.get<IPersonagem>(environment.apiURL  + '/' + this.controller + id.toString() +'/');
  }
  ConsultarPersonagensPagina(url: string): Observable<IPersonagensLista> {
    return this.http.get<IPersonagensLista>(url);
  } 
}
