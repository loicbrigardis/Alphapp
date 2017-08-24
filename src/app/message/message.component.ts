import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';

import { MessagesService } from "../services/messages.service";
import { Message } from "./message.model";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  responseMsg: String | null = null;
  responseEdit: String | null = null;
  myMsg: String | null = "";
  editMsg: String;
  editedMessage;

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.messagesService.getAll()
      .subscribe(
      data => {
        for (let message of data.obj) {
          this.messages.unshift(new Message(
            message.content, 
            message.user.firstname, 
            message._id, 
            message.user._id));
        }
      },
      err => this.responseMsg = err.message
      );
  }

  onSave(message) {
    if (!message) {
      this.responseMsg = "Message can not be empty";
      return;
    }
    
    let mes = new Message(message, null);
    
    this.messagesService.createMessage(mes)
      .subscribe(
        data => {
          let newMessage = new Message(
            data.content, data.username,
            data.messageId, data.userId
          );
          this.messages.unshift(newMessage);
          this.myMsg = "";
          this.responseMsg = "";
        },
        err => this.responseMsg = err.message
      );
  }

  editMessage(message) {
    this.editMsg = message.messageId;
    this.editedMessage = message.content;
  }

  cancelEditMessage() {
    this.editMsg = ""; 
  }

  sendEditMessage(message, sendEditMessage) {
    message.content = sendEditMessage;
    this.messagesService.editMessage(message).subscribe(
      data => {     
        this.responseEdit = data.title;
        setTimeout(() => {
          this.editMsg = ""; 
          this.responseEdit = null;
        }, 1000)
      }, error => {
        this.responseEdit = error.message;
      }
    );
  }

  deleteMessage(message) {   
    this.messagesService.deleteMessage(message)
      .subscribe( data => {
        for (let mes of this.messages) {         
          if (mes.messageId === data.obj._id) { 
            let index = this.messages.indexOf(mes);
            this.messages.splice(index, 1);
          }
        }
      }, err => this.responseMsg = err.message );
  }

  messageOwner(message) {
    return message.userId === localStorage.getItem('userId');
  }

}
