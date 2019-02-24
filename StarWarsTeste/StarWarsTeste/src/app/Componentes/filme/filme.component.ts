import { SingletonService } from './../../Services/singleton.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css']
})
export class FilmeComponent implements OnInit {

  constructor(public singletonService: SingletonService) { }

  ngOnInit() {
  }

}
