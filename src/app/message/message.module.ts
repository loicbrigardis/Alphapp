import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MessageComponent } from './message.component';
import { MessagesService } from './../services/messages.service';

@NgModule({
    declarations: [
        MessageComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
    ],
    providers: [
        MessagesService
    ]
})

export class MessageModule { }