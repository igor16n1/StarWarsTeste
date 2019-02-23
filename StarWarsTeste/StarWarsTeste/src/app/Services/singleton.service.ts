import { PersonagemDTO } from './../Classes/personagem-dto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
  public personagemDTO: PersonagemDTO;
  constructor() { 
    this.personagemDTO = new PersonagemDTO();
  }
}
