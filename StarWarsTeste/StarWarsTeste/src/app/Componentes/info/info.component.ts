import { SingletonService } from './../../Services/singleton.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent{  
  constructor(public singletonService: SingletonService) { }
}
