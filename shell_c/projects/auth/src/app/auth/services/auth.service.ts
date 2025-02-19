import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  access_token: string;
  message: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'any' // sa mor euuuu
})
export class AuthService {

  private baseUrl = 'http://localhost/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body).pipe(
      tap((response: LoginResponse) => {
        if (response?.access_token) {
          this.storeToken(response.access_token);
        }
      })
    );
  }

  register(username: string, password: string, name: string, role: string): Observable<RegisterResponse> {
    const body = { username, password, name, role };
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, body);
  }

  // private baseUrl = 'http://localhost/auth';
  //
  // constructor(private http: HttpClient) {}
  //
  // login(username: string, password: string): Observable<LoginResponse> {
  //   const body = {
  //     username: username,
  //     password: password,
  //   };
  //
  //   return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body).pipe(
  //     tap((response: LoginResponse) => {
  //       if (response?.access_token) {
  //         console.log('Login success: token is ', response.access_token);
  //         this.storeToken(response.access_token);
  //       } else {
  //         console.error('Login failed: No token in response');
  //       }
  //     })
  //   );
  // }
  //
  // register(username: string, password: string, name: string, role: string): Observable<RegisterResponse> {
  //   const body = {
  //     username: username,
  //     password: password,
  //     name: name,
  //     role: role,
  //   };
  //
  //   return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, body);
  // }


  // Store JWT token
  storeToken(token: string): void {
    sessionStorage.setItem('jwt_token', token);
  }

  // Get JWT token
  getToken(): string | null {
    return sessionStorage.getItem('jwt_token');
  }

  getUserRole(): string {
    const token = this.getToken();
    console.log("Token is ", token);

    if (!token) {
      return '';
    }

    try {
      const decodedToken: any = jwtDecode(token);
      sessionStorage.setItem('user_role', decodedToken.role || '');
      sessionStorage.setItem('user_id', decodedToken.id || '');
      console.log("user role is: ", sessionStorage.getItem('user_role'));
      console.log("user id is: ", sessionStorage.getItem('user_id'));
      return decodedToken.role || '';
    } catch (error) {
      console.error('Error decoding token', error);
      return '';
    }
  }
}
