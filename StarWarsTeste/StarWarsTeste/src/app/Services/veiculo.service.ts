import { IVeiculoDTO } from './../Interfaces/iveiculo-dto';
import { environment } from './../../environments/environment.prod';
import { ILista } from './../Interfaces/ilista';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  controller: string = 'vehicles/';

  constructor(private http: HttpClient) { }

  ConsultarVeiculos(): Observable<ILista> {
    return this.http.get<ILista>(environment.apiURL + '/' + this.controller);
  }  
  ConsultarVeiculosPagina(url: string): Observable<ILista> {
    return this.http.get<ILista>(url);
  } 
  ConsultarVeiculo(url: string): Observable<IVeiculoDTO> {
    return this.http.get<IVeiculoDTO>(url);
  } 
}
