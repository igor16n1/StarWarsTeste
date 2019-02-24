import { SingletonService } from './../../Services/singleton.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planeta',
  templateUrl: './planeta.component.html',
  styleUrls: ['./planeta.component.css']
})
export class PlanetaComponent implements OnInit {

  constructor(public singletonService: SingletonService) { }

  ngOnInit() {
  }

}
