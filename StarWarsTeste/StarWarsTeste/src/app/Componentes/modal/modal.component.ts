import { SingletonService } from './../../Services/singleton.service';

import { Component } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ElementRef } from "@angular/core";
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {  
  @ViewChild('content') modal:ElementRef;
  constructor(private modalService: NgbModal, public singletonService: SingletonService) {}
  open() {
    this.modalService.open(this.modal, {ariaLabelledBy: 'modal-basic-title'});
  }
}
