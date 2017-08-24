import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MessageModule } from './message/message.module';

import { appRoutes } from './app-routing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorsComponent } from './errors/errors.component';

import { AuthService } from './services/auth.service';
import { ErrorsService } from './errors/errors.service';
import { PrivateComponent } from './private/private.component';
import { ImageComponent } from './image/image.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ErrorsComponent,
    PrivateComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule
  ],
  providers: [ 
    AuthService,
    ErrorsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
