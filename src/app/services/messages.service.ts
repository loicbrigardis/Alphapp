import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { ErrorsService } from './../errors/errors.service';
import { Message } from "../message/message.model";

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class MessagesService {

  private API_URL = 'http://localhost:4400/api/message';
  private options = new Headers({ 'Content-Type': 'application/json' });

  constructor(    
    private http: Http, 
    private errorsService: ErrorsService) { }

  getAll(): Observable<any> {
    return this.http.get(this.API_URL)
      .map((result: Response) => result.json())
      .catch((err: Response) => {
        this.errorsService.handleError(err.json());
        return Observable.throw(err.json());
      });
  }

  createMessage(message: Message): Observable<any> {
    const USER_TOKEN = localStorage.getItem('token') 
    ? '?token=' + localStorage.getItem('token') 
    : '';
    return this.http.post(this.API_URL + USER_TOKEN, JSON.stringify(message), { headers: this.options})
      .map((result: Response) => {
        const res = result.json().obj;
        return new Message(
        res.content, 
        res.user.firstname,
        res._id, 
        res.user._id);
      })
      .catch((err: Response) => {
        this.errorsService.handleError(err.json());
        return Observable.throw(err.json());
      });
  }

  deleteMessage(message: Message): Observable<any> {
    const USER_TOKEN = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    let messageId = message.messageId ? "&id=" + message.messageId : "";
    return this.http.delete(this.API_URL + USER_TOKEN + messageId, { headers: this.options})
      .map((result: Response) => result.json())
      .catch((err: Response) => {
        this.errorsService.handleError(err.json());
        return Observable.throw(err.json());
      });
  }

  editMessage(message: Message): Observable<any> {
    const USER_TOKEN = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.patch(this.API_URL + USER_TOKEN, JSON.stringify(message), { headers: this.options})
      .map((result: Response) => result.json())
      .catch((err: Response) => {
        this.errorsService.handleError(err.json());
        return Observable.throw(err.json());
      });
  }

}
