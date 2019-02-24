import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import {HttpClientModule} from '@angular/common/http';
import { InfoComponent } from './Componentes/info/info.component';
import { EspecieComponent } from './Componentes/especie/especie.component';
import { FilmeComponent } from './Componentes/filme/filme.component';
import { NaveComponent } from './Componentes/nave/nave.component';
import { PersonagemComponent } from './Componentes/personagem/personagem.component';
import { PlanetaComponent } from './Componentes/planeta/planeta.component';
import { VeiculoComponent } from './Componentes/veiculo/veiculo.component';
import { ModalComponent } from './Componentes/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    EspecieComponent,
    FilmeComponent,
    NaveComponent,
    PersonagemComponent,
    PlanetaComponent,
    VeiculoComponent,
    ModalComponent,    
  ],
  imports: [NgbModule,
 FormsModule,
 ReactiveFormsModule,
 HttpClientModule,
    BrowserModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
