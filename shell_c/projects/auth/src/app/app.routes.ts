import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {BikeComponent} from '../../../bike/src/app/bike/bike.component';
import {AuthComponent} from './auth/auth.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/auth/login', pathMatch:"full"},
  // { path: '', component: AuthComponent }
];
