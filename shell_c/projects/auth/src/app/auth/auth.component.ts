import { Component } from '@angular/core';
import {AuthService, RegisterResponse} from './services/auth.service';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  // template: '<h2>AuthUL Works!</h2>'
})
export class AuthComponent {
}
