import { Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./signup/signup.component";
import { MessageComponent } from "./message/message.component";
import { PrivateComponent } from './private/private.component';

export const appRoutes:Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'message', component: MessageComponent},
    { path: 'private', component: PrivateComponent},
    { path: '**', component: HomeComponent},
];