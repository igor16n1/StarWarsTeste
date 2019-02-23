import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import {HttpClientModule} from '@angular/common/http';
import { InfoComponent } from './Componentes/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,    
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
