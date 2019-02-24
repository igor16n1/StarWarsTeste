import { VeiculoDTO } from './../Classes/veiculo-dto';
import { PlanetaDTO } from './../Classes/planeta-dto';
import { NaveDTO } from './../Classes/nave-dto';
import { FilmeDTO } from './../Classes/filme-dto';
import { EspecieDTO } from './../Classes/especie-dto';
import { CategoriaBusca } from './../Enum/categoria-busca.enum';
import { PersonagemDTO } from './../Classes/personagem-dto';
import { Injectable } from '@angular/core';
import { ElementRef } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
  public personagemDTO: PersonagemDTO;
  public especieDTO: EspecieDTO;  
  public filmeDTO: FilmeDTO;
  public naveDTO: NaveDTO;
  public planetaDTO: PlanetaDTO;
  public veiculoDTO: VeiculoDTO;
  public categoriaBusca: CategoriaBusca;
  public modal: any;
  constructor() { 
    this.personagemDTO = new PersonagemDTO();
    this.especieDTO = new EspecieDTO();  
    this.filmeDTO = new FilmeDTO();
    this.naveDTO = new NaveDTO();
    this.planetaDTO = new PlanetaDTO();
    this.veiculoDTO = new VeiculoDTO();    
  }
}
