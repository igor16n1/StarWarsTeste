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
import { PersonagensListaDTO } from './Classes/personagens-lista-dto';
import { PersonagemDTO } from './Classes/personagem-dto';
import { PersonagensService } from './Services/personagens.service';
import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;  
  personagensListaDTO: PersonagensListaDTO;  
  listaDTO: ListaDTO;
  tratamentoErro: TratamentoErro;  
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
    this.tratamentoErro = new TratamentoErro();    
    this.ConsultarPersonagens();     
    this.SelecionarCategoria(CategoriaBusca.Personagem);
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
  ConsultarPersonagensPagina(url: string)
  {
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
  //Consulta informação de objeto selecionado
  ConsultarInfo(obj: any)
  {            
    if(CategoriaBusca.Especie == this.singletonService.categoriaBusca)
    {
      this.singletonService.especieDTO = obj;
    }
    else if(CategoriaBusca.Filme == this.singletonService.categoriaBusca)
    {
      this.singletonService.filmeDTO = obj;
    }
    else if(CategoriaBusca.Nave == this.singletonService.categoriaBusca)
    {
      this.singletonService.naveDTO = obj;
    }
    else if(CategoriaBusca.Personagem == this.singletonService.categoriaBusca)
    {
      this.singletonService.personagemDTO = obj;
    }
    else if(CategoriaBusca.Planeta == this.singletonService.categoriaBusca)
    {
      this.singletonService.planetaDTO = obj;
    }
    else if(CategoriaBusca.Veiculo == this.singletonService.categoriaBusca)
    {
      this.singletonService.veiculoDTO = obj;
    }   
  }
  //Consulta página posterior
  ConsultarPaginaPosterior()
  {    
    if(this.listaDTO.next)
    {      
      this.ConsultarPersonagensPagina(this.listaDTO.next);
    }    
  }
  //Consulta página anterior
  ConsultarPaginaAnterior()
  {    
    if(this.listaDTO.previous)
    {
      this.ConsultarPersonagensPagina(this.listaDTO.previous);
    }
  }
  //Seleciona categoria
  SelecionarCategoria(id: number)
  {    
    this.singletonService.categoriaBusca = id;
    if(CategoriaBusca.Especie == this.singletonService.categoriaBusca)
    {
      this.ConsultarEspecies();
    }
    else if(CategoriaBusca.Filme == this.singletonService.categoriaBusca)
    {
      this.ConsultarFilmes();
    }
    else if(CategoriaBusca.Nave == this.singletonService.categoriaBusca)
    {
      this.ConsultarNaves();
    }
    else if(CategoriaBusca.Personagem == this.singletonService.categoriaBusca)
    {
      this.ConsultarPersonagens();
    }
    else if(CategoriaBusca.Planeta == this.singletonService.categoriaBusca)
    {
      this.ConsultarPlanetas();
    }
    else if(CategoriaBusca.Veiculo == this.singletonService.categoriaBusca)
    {
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
  ConsultarEspeciesPagina(url: string)
  {
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
  ConsultarFilmesPagina(url: string)
  {
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
  ConsultarNavesPagina(url: string)
  {
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
  ConsultarPlanetasPagina(url: string)
  {
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
  ConsultarVeiculosPagina(url: string)
  {
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
}