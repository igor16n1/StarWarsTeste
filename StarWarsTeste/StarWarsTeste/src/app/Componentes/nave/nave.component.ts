import { SingletonService } from './../../Services/singleton.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nave',
  templateUrl: './nave.component.html',
  styleUrls: ['./nave.component.css']
})
export class NaveComponent implements OnInit {

  constructor(public singletonService: SingletonService) { }

  ngOnInit() {
  }

}
