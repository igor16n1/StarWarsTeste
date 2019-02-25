import { VeiculoDTO } from './Classes/veiculo-dto';
import { PlanetaDTO } from './Classes/planeta-dto';
import { NaveDTO } from './Classes/nave-dto';
import { FilmeDTO } from './Classes/filme-dto';
import { PlanetaService } from './Services/planeta.service';
import { VeiculoService } from './Services/veiculo.service';
import { NaveService } from './Services/nave.service';
import { FilmeService } from './Services/filme.service';
import { ListaDTO } from './Classes/lista-dto';
import { EspecieDTO } from './Classes/especie-dto';
import { EspecieService } from './Services/especie.service';
import { CategoriaBusca } from './Enum/categoria-busca.enum';
import { SingletonService } from './Services/singleton.service';
import { TratamentoErro } from './Classes/tratamento-erro';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonagemDTO } from './Classes/personagem-dto';
import { PersonagensService } from './Services/personagens.service';
import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ElementRef } from "@angular/core";
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  listaDTO: ListaDTO;
  tratamentoErro: TratamentoErro;
  titulos: string[] = [
    'Personagem',
    'Filme',
    'Nave',
    'veículo',
    'Espécie',    
    'Planeta'    
  ];
  titulo: string = '';
  @ViewChild('modal') modal: ElementRef;
  constructor(
    public singletonService: SingletonService,
    private personagensService: PersonagensService,
    private especieService: EspecieService,
    private filmeService: FilmeService,
    private naveService: NaveService,
    private veiculoService: VeiculoService,
    private planetaService: PlanetaService,
  ) { }

  ngOnInit() {
    this.titulo = this.titulos[0];
    this.singletonService.modal = this.modal;
    this.tratamentoErro = new TratamentoErro(this.singletonService);
    this.singletonService.categoriaBusca = CategoriaBusca.Personagem;
    this.ConsultarPersonagens();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  //Consulta todos os personagens
  ConsultarPersonagens() {
    this.subscription = this.personagensService.ConsultarPersonagens()
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta lista de personagens por url
  ConsultarPersonagensPagina(url: string) {
    this.subscription = this.personagensService.ConsultarPersonagensPagina(url)
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta personagem
  ConsultarPersonagem(url: string, id: number) {
    this.subscription = this.personagensService.ConsultarPersonagem(url)
      .subscribe(
      resp => {
        if (resp) {                    
          if(CategoriaBusca.Filme == this.singletonService.categoriaBusca)
          {            
            this.singletonService.filmeDTO.characters[id] = resp.name;
          }
          else if(CategoriaBusca.Nave == this.singletonService.categoriaBusca)
          {
            this.singletonService.naveDTO.pilots[id] = resp.name;
          }
          else if(CategoriaBusca.Veiculo == this.singletonService.categoriaBusca)
          {
            this.singletonService.veiculoDTO.pilots[id] = resp.name;  
          }
          else if(CategoriaBusca.Especie == this.singletonService.categoriaBusca)
          {
            this.singletonService.especieDTO.people[id] = resp.name;  
          }
          else if(CategoriaBusca.Planeta == this.singletonService.categoriaBusca)
          {
            this.singletonService.planetaDTO.residents[id] = resp.name;  
          }
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta informação de objeto selecionado
  ConsultarInfo(obj: any) {   
    if (CategoriaBusca.Especie == this.singletonService.categoriaBusca) {
      this.singletonService.especieDTO = obj;      
      if (obj.homeworld.substring(0, 4) == 'http') {
        this.ConsultarPlaneta(obj.homeworld);
      }
      this.singletonService.especieDTO.films = obj.films;
      for (var i = 0; i < obj.films.length; i++) {
        if (obj.films[i].substring(0, 4) == 'http') {
          this.ConsultarFilme(obj.films[i], i);
        }
      }
      this.singletonService.especieDTO.people = obj.people;
      for (var i = 0; i < obj.people.length; i++) {
        if (obj.people[i].substring(0, 4) == 'http') {          
          this.ConsultarPersonagem(obj.people[i], i);
        }
      }      
    }
    else if (CategoriaBusca.Filme == this.singletonService.categoriaBusca) {
      this.singletonService.filmeDTO = obj;
      this.singletonService.filmeDTO.characters = obj.characters;
      for (var i = 0; i < obj.characters.length; i++) {
        if (obj.characters[i].substring(0, 4) == 'http') {          
          this.ConsultarPersonagem(obj.characters[i], i);
        }
      }
      this.singletonService.filmeDTO.planets = obj.planets;
      for (var i = 0; i < obj.planets.length; i++) {
        if (obj.planets[i].substring(0, 4) == 'http') {
          this.ConsultarPlaneta(obj.planets[i], i);          
        }
      }
      this.singletonService.filmeDTO.species = obj.species;
      for (var i = 0; i < obj.species.length; i++) {
        if (obj.species[i].substring(0, 4) == 'http') {
          this.ConsultarEspecie(obj.species[i], i);
        }
      }
      this.singletonService.filmeDTO.vehicles = obj.vehicles;
      for (var i = 0; i < obj.vehicles.length; i++) {
        if (obj.vehicles[i].substring(0, 4) == 'http') {
          this.ConsultarVeiculo(obj.vehicles[i], i);
        }
      }
      this.singletonService.filmeDTO.starships = obj.starships;
      for (var i = 0; i < obj.starships.length; i++) {
        if (obj.starships[i].substring(0, 4) == 'http') {
          this.ConsultarNave(obj.starships[i], i);
        }
      }
    }
    else if (CategoriaBusca.Nave == this.singletonService.categoriaBusca) {
      this.singletonService.naveDTO = obj;
      this.singletonService.naveDTO.films = obj.films;
      for (var i = 0; i < obj.films.length; i++) {
        if (obj.films[i].substring(0, 4) == 'http') {
          this.ConsultarFilme(obj.films[i], i);
        }
      }
      this.singletonService.naveDTO.pilots = obj.pilots;
      for (var i = 0; i < obj.pilots.length; i++) {
        if (obj.pilots[i].substring(0, 4) == 'http') {          
          this.ConsultarPersonagem(obj.pilots[i], i);
        }
      }
    }
    else if (CategoriaBusca.Personagem == this.singletonService.categoriaBusca) {
      this.singletonService.personagemDTO = obj;
      if (obj.homeworld.substring(0, 4) == 'http') {
        this.ConsultarPlaneta(obj.homeworld);
      }      
      this.singletonService.personagemDTO.films = obj.films;
      for (var i = 0; i < obj.films.length; i++) {
        if (obj.films[i].substring(0, 4) == 'http') {
          this.ConsultarFilme(obj.films[i], i);
        }
      }
      this.singletonService.personagemDTO.species = obj.species;
      for (var i = 0; i < obj.species.length; i++) {
        if (obj.species[i].substring(0, 4) == 'http') {
          this.ConsultarEspecie(obj.species[i], i);
        }
      }
      this.singletonService.personagemDTO.vehicles = obj.vehicles;
      for (var i = 0; i < obj.vehicles.length; i++) {
        if (obj.vehicles[i].substring(0, 4) == 'http') {
          this.ConsultarVeiculo(obj.vehicles[i], i);
        }
      }
      this.singletonService.personagemDTO.starships = obj.starships;
      for (var i = 0; i < obj.starships.length; i++) {
        if (obj.starships[i].substring(0, 4) == 'http') {
          this.ConsultarNave(obj.starships[i], i);
        }
      }
    }
    else if (CategoriaBusca.Planeta == this.singletonService.categoriaBusca) {
      this.singletonService.planetaDTO = obj;
      this.singletonService.planetaDTO.films = obj.films;
      for (var i = 0; i < obj.films.length; i++) {
        if (obj.films[i].substring(0, 4) == 'http') {
          this.ConsultarFilme(obj.films[i], i);
        }
      }
      this.singletonService.planetaDTO.residents = obj.residents;
      for (var i = 0; i < obj.residents.length; i++) {
        if (obj.residents[i].substring(0, 4) == 'http') {          
          this.ConsultarPersonagem(obj.residents[i], i);
        }
      }      
    }
    else if (CategoriaBusca.Veiculo == this.singletonService.categoriaBusca) {
      this.singletonService.veiculoDTO = obj;
      this.singletonService.veiculoDTO.films = obj.films;
      for (var i = 0; i < obj.films.length; i++) {
        if (obj.films[i].substring(0, 4) == 'http') {
          this.ConsultarFilme(obj.films[i], i);
        }
      }
      this.singletonService.veiculoDTO.pilots = obj.pilots;
      for (var i = 0; i < obj.pilots.length; i++) {
        if (obj.pilots[i].substring(0, 4) == 'http') {          
          this.ConsultarPersonagem(obj.pilots[i], i);
        }
      }      
    }
  }
  //Consulta página posterior
  ConsultarPaginaPosterior() {
    if (this.listaDTO.next) {
      this.ConsultarPersonagensPagina(this.listaDTO.next);
    }
  }
  //Consulta página anterior
  ConsultarPaginaAnterior() {
    if (this.listaDTO.previous) {
      this.ConsultarPersonagensPagina(this.listaDTO.previous);
    }
  }
  //Seleciona categoria
  SelecionarCategoria(id: number) {
    this.titulo = this.titulos[id];//<-
    this.singletonService.categoriaBusca = id;
    if (CategoriaBusca.Especie == this.singletonService.categoriaBusca) {
      this.ConsultarEspecies();
    }
    else if (CategoriaBusca.Filme == this.singletonService.categoriaBusca) {
      this.ConsultarFilmes();
    }
    else if (CategoriaBusca.Nave == this.singletonService.categoriaBusca) {
      this.ConsultarNaves();
    }
    else if (CategoriaBusca.Personagem == this.singletonService.categoriaBusca) {
      this.ConsultarPersonagens();
    }
    else if (CategoriaBusca.Planeta == this.singletonService.categoriaBusca) {
      this.ConsultarPlanetas();
    }
    else if (CategoriaBusca.Veiculo == this.singletonService.categoriaBusca) {
      this.ConsultarVeiculos();
    }
  }
  //Consulta todos as espécies
  ConsultarEspecies() {
    this.subscription = this.especieService.ConsultarEspecies()
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta lista de espécies por url
  ConsultarEspeciesPagina(url: string) {
    this.subscription = this.especieService.ConsultarEspeciePagina(url)
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Recebe uma url e passa o nome para o singleton
  ConsultarEspecie(url: string, id: number) {
    this.subscription = this.especieService.ConsultarEspecie(url)
      .subscribe(
      resp => {
        if (resp) {
          if(CategoriaBusca.Personagem == this.singletonService.categoriaBusca)
          {
            this.singletonService.personagemDTO.species[id] = resp.name;  
          }
          else if(CategoriaBusca.Filme == this.singletonService.categoriaBusca)
          {
            this.singletonService.filmeDTO.species[id] = resp.name;  
          }          
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta todos os filmes
  ConsultarFilmes() {
    this.subscription = this.filmeService.ConsultarFilmes()
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta lista de filmes por url
  ConsultarFilmesPagina(url: string) {
    this.subscription = this.filmeService.ConsultarFilmesPagina(url)
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Recebe uma url e passa o título para o singleton
  ConsultarFilme(url: string, id: number) {
    this.subscription = this.filmeService.ConsultarFilme(url)
      .subscribe(
      resp => {
        if (resp) {
          if(CategoriaBusca.Personagem == this.singletonService.categoriaBusca)
          {
            this.singletonService.personagemDTO.films[id] = resp.title;
          }
          else if(CategoriaBusca.Nave == this.singletonService.categoriaBusca)
          {
            this.singletonService.naveDTO.films[id] = resp.title;  
          }
          else if(CategoriaBusca.Veiculo == this.singletonService.categoriaBusca)
          {
            this.singletonService.veiculoDTO.films[id] = resp.title;  
          }
          else if(CategoriaBusca.Especie == this.singletonService.categoriaBusca)
          {
            this.singletonService.especieDTO.films[id] = resp.title;  
          }
          else if(CategoriaBusca.Planeta == this.singletonService.categoriaBusca)
          {
            this.singletonService.planetaDTO.films[id] = resp.title;
          }
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta todos as naves
  ConsultarNaves() {
    this.subscription = this.naveService.ConsultarNaves()
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta lista de naves por url
  ConsultarNavesPagina(url: string) {
    this.subscription = this.naveService.ConsultarNavesPagina(url)
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Recebe uma url e passa o nome para o singleton
  ConsultarNave(url: string, id: number) {
    this.subscription = this.naveService.ConsultarNave(url)
      .subscribe(
      resp => {
        if (resp) {
          if(CategoriaBusca.Personagem == this.singletonService.categoriaBusca)
          {
            this.singletonService.personagemDTO.starships[id] = resp.name;
          }
          else if(CategoriaBusca.Filme == this.singletonService.categoriaBusca)
          {
            this.singletonService.filmeDTO.starships[id] = resp.name;
          }           
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta todos os planetas
  ConsultarPlanetas() {
    this.subscription = this.planetaService.ConsultarPlanetas()
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta lista de planetas por url
  ConsultarPlanetasPagina(url: string) {
    this.subscription = this.planetaService.ConsultarPlanetasPagina(url)
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consultar planeta por url
  ConsultarPlaneta(url: string, id: number = 0) {
    this.subscription = this.planetaService.ConsultarPlaneta(url)
      .subscribe(
      resp => {
        if (resp) {
          
          if(CategoriaBusca.Personagem == this.singletonService.categoriaBusca)
          {
            this.singletonService.personagemDTO.homeworld = resp.name;
          }
          else if(CategoriaBusca.Filme == this.singletonService.categoriaBusca)
          {            
            this.singletonService.filmeDTO.planets[id] = resp.name;
          } 
          else if(CategoriaBusca.Especie == this.singletonService.categoriaBusca)
          {            
            this.singletonService.especieDTO.homeworld = resp.name;            
          } 
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta todos os veículos
  ConsultarVeiculos() {
    this.subscription = this.veiculoService.ConsultarVeiculos()
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Consulta lista de veículos por url
  ConsultarVeiculosPagina(url: string) {
    this.subscription = this.veiculoService.ConsultarVeiculosPagina(url)
      .subscribe(
      resp => {
        if (resp) {
          this.listaDTO = resp;
          this.ConsultarInfo(this.listaDTO.results[0]);
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  //Recebe uma url e passa o nome para o singleton
  ConsultarVeiculo(url: string, id: number) {
    this.subscription = this.veiculoService.ConsultarVeiculo(url)
      .subscribe(
      resp => {
        if (resp) {          
          if(CategoriaBusca.Personagem == this.singletonService.categoriaBusca)
          {
            this.singletonService.personagemDTO.vehicles[id] = resp.name;
          }
          else if(CategoriaBusca.Filme == this.singletonService.categoriaBusca)
          {
            this.singletonService.filmeDTO.vehicles[id] = resp.name;            
          } 
        }
      },
      err => {
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
}