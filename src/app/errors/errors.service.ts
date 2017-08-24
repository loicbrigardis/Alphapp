import { Error } from './errors.model';
import { EventEmitter } from "@angular/core";

export class ErrorsService {
  errorEvent = new EventEmitter<Error>();
  
  handleError(error: any) {
    const errorData = new Error(error.message, error.error)
    this.errorEvent.emit(errorData);
  }

}
