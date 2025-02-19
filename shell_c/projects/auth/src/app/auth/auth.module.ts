import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {routes} from '../app.routes';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent, RegisterComponent
  ],
  providers: [provideHttpClient()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class AuthModule {
}
