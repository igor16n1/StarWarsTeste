import { IPlanetaDTO } from './../Interfaces/iplaneta-dto';
import { environment } from './../../environments/environment.prod';
import { ILista } from './../Interfaces/ilista';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanetaService {

  controller: string = 'planets/';

  constructor(private http: HttpClient) { }

  ConsultarPlanetas(): Observable<ILista> {
    return this.http.get<ILista>(environment.apiURL + '/' + this.controller);
  }
  ConsultarPlaneta(id: number): Observable<IPlanetaDTO> {
    return this.http.get<IPlanetaDTO>(environment.apiURL  + '/' + this.controller + id.toString() +'/');
  }
  ConsultarPlanetasPagina(url: string): Observable<ILista> {
    return this.http.get<ILista>(url);
  } 
}
