import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GetRentedBikeResponse, GetUsersResponse} from './user/model/user.model';

@Injectable({
  providedIn: 'any'
})
export class UserService {
  private userUrl = 'http://localhost/user';
  private bikeUrl = 'http://localhost/bike';

  constructor(private http: HttpClient) {}

  getAuthToken(): string | null {
    return sessionStorage.getItem('jwt_token');
  }

  // Set up the Authorization header with JWT token
  getHttpOptions(): { headers: HttpHeaders } {
    const token = this.getAuthToken();
    return {
      headers: new HttpHeaders({
        'Authorization': token ? `Bearer ${token}` : '',
      }),
    };
  }

  getUserProfile(): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get(`${this.userUrl}/profile`, httpOptions);
  }

  addBike(bike: any): Observable<any> {
    return this.http.post(`${this.bikeUrl}/add`, bike, this.getHttpOptions());
  }

  getUsers(): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(`${this.userUrl}/users`, this.getHttpOptions());
  }

  getBorrowings(userId: number): Observable<GetRentedBikeResponse> {
    return this.http.get<any>(`${this.bikeUrl}/rented_bikes?user_id=${userId}`, this.getHttpOptions());
  }

  returnBike(bike: number): Observable<any>{
    let userId = sessionStorage.getItem('user_id');
    const payload = { user_id: userId, bike_id: bike };
    return this.http.post(`${this.userUrl}/return`, payload, this.getHttpOptions());
  }
}
