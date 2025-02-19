import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent {
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, password, name, role } = this.registerForm.value;
      this.authService.register(username!, password!, name!, role!).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']); // Redirect to login page after registration
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
