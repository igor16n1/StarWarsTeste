import { SingletonService } from './../../Services/singleton.service';
import { PersonagemDTO } from './../../Classes/personagem-dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  personagemDTO: PersonagemDTO;
  constructor(public singletonService: SingletonService) { }

  ngOnInit() {
  }

}
