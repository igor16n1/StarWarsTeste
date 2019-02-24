import { SingletonService } from './../../Services/singleton.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-especie',
  templateUrl: './especie.component.html',
  styleUrls: ['./especie.component.css']
})
export class EspecieComponent implements OnInit {

  constructor(public singletonService: SingletonService) { }

  ngOnInit() {
  }

}
