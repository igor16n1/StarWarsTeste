import { IFilmeDTO } from './../Interfaces/ifilme-dto';
import { environment } from './../../environments/environment.prod';
import { ILista } from './../Interfaces/ilista';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  controller: string = 'films/';

  constructor(private http: HttpClient) { }

  ConsultarFilmes(): Observable<ILista> {
    return this.http.get<ILista>(environment.apiURL + '/' + this.controller);
  }  
  ConsultarFilmesPagina(url: string): Observable<ILista> {
    return this.http.get<ILista>(url);
  } 
  ConsultarFilme(url: string): Observable<IFilmeDTO> {
    return this.http.get<IFilmeDTO>(url);
  } 
}
