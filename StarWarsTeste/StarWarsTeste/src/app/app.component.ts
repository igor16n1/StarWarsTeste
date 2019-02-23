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
  personagemDTO: PersonagemDTO;
  personagensListaDTO: PersonagensListaDTO;  
  tratamentoErro: TratamentoErro;  
  
  constructor(private personagensService: PersonagensService, public singletonService: SingletonService) { }

  ngOnInit() {
    this.tratamentoErro = new TratamentoErro();
    this.ConsultarPersonagens();    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ConsultarPersonagens() {
    this.subscription = this.personagensService.ConsultarPersonagens()
      .subscribe(
      resp => {
        if (resp) {
          this.personagensListaDTO = resp;          
        }
      },
      err => {        
        this.tratamentoErro.MontarMensagemErro(err);        
      }
      );
  }
  ConsultarPersonagem(id: number) {
    this.subscription = this.personagensService.ConsultarPersonagem(id)
      .subscribe(
      resp => {
        if (resp) {
          this.personagemDTO = resp;
        }
      },
      err => {        
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }
  ConsultarPersonagensPagina(url: string)
  {
    this.subscription = this.personagensService.ConsultarPersonagensPagina(url)
      .subscribe(
      resp => {
        if (resp) {
          this.personagensListaDTO = resp; 
          console.log(this.personagensListaDTO);
        }
      },
      err => {        
        this.tratamentoErro.MontarMensagemErro(err);
      }
      );
  }

  ConsultarInfo(obj: PersonagemDTO)
  {        
    this.singletonService.personagemDTO = obj;
  }

  ConsultarPaginaPosterior()
  {
    if(this.personagensListaDTO.next)
    {      
      this.ConsultarPersonagensPagina(this.personagensListaDTO.next);
    }    
  }
  ConsultarPaginaAnterior()
  {
    if(this.personagensListaDTO.previous)
    {
      this.ConsultarPersonagensPagina(this.personagensListaDTO.previous);
    }
  }
}
