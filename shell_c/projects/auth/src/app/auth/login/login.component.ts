import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService, RegisterResponse} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  loginUsername = '';
  loginPassword = '';

  registerUsername = '';
  registerPassword = '';
  registerName = '';
  registerRole = 'renter'; // Default role

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.loginUsername, this.loginPassword).subscribe(
      (response: { message: any; access_token: string; }) => {
        alert(response.message);
        console.log('Response received:', response);
        // Store the user role locally
        this.authService.getUserRole();
        this.router.navigate(['/dashboard']);
        sessionStorage.setItem('access_token', response.access_token); // Store JWT token
      },
      (error: { error: { msg: any; }; }) => {
        alert(error.error.msg); // Display error message
      }
    );
  }

  onRegister(): void {
    this.authService
      .register(
        this.registerUsername,
        this.registerPassword,
        this.registerName,
        this.registerRole
      )
      .subscribe(
        (response: RegisterResponse) => {
          console.log('Response received:', response);
          alert(response.message ?? 'Registration successful'); // Use a default message if message is missing

          this.clearRegistrationForm();
        },
        (error: { error: { msg: any; }; }) => {
          alert(error.error.msg); // Display error message
        }
      );
  }

  clearRegistrationForm(): void {
    this.registerUsername = '';
    this.registerPassword = '';
    this.registerName = '';
    this.registerRole = 'renter';
  }

  // public loginForm: FormGroup;
  //
  //
  // constructor(
  //   private fb: FormBuilder,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.loginForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }
  //
  // onLogin() {
  //   if (this.loginForm.valid) {
  //     const { username, password } = this.loginForm.value;
  //     this.authService.login(username!, password!).subscribe(
  //       (response) => {
  //         console.log('Login successful:', response);
  //         this.router.navigate(['/dashboard']);  // Redirect to dashboard
  //       },
  //       (error) => {
  //         console.error('Login failed:', error);
  //       }
  //     );
  //   }
  // }
}
