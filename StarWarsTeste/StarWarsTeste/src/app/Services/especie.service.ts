import { IEspecieDTO } from './../Interfaces/iespecie-dto';
import { environment } from './../../environments/environment.prod';
import { ILista } from './../Interfaces/ilista';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  controller: string = 'species/';

  constructor(private http: HttpClient) { }

  ConsultarEspecies(): Observable<ILista> {
    return this.http.get<ILista>(environment.apiURL + '/' + this.controller);
  }  
  ConsultarEspeciePagina(url: string): Observable<ILista> {
    return this.http.get<ILista>(url);
  } 
  ConsultarEspecie(url: string): Observable<IEspecieDTO> {
    return this.http.get<IEspecieDTO>(url);
  } 
}
