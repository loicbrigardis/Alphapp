import { ErrorsService } from './errors.service';
import { Component, OnInit } from '@angular/core';

import { Error } from './errors.model';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styles: [`
    .modal-bg {
      background-color: rgba(0,0,0,0.6);
      position: fixed;
      top:0;
      left:0;
      width: 100%;
      height: 100vh;
    }
  `]
})
export class ErrorsComponent implements OnInit {
  errors: Error;
  display: String = 'none';

  constructor(private errorsService: ErrorsService) { }

  ngOnInit() {
    this.errorsService.errorEvent.subscribe((error: Error) => {
      this.errors = error;
      this.display = 'block';
    });
   }

  closeModal() {
    this.display = 'none';
  }

}
