import { SingletonService } from './../../Services/singleton.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personagem',
  templateUrl: './personagem.component.html',
  styleUrls: ['./personagem.component.css']
})
export class PersonagemComponent implements OnInit {

  constructor(public singletonService: SingletonService) { }

  ngOnInit() {
  }

}
