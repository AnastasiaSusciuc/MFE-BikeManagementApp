import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class BikeService {
  private apiUrl = 'http://localhost/bike';
  private userUrl = 'http://localhost/user';

  constructor(private http: HttpClient) {}

  // Get the JWT token from sessionStorage
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

  // Get all bikes with JWT token authorization
  getAllBikes(): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get(`${this.apiUrl}/all_bikes`, httpOptions);
  }

  borrowBike(bikeId: number): Observable<any> {
    let userId = sessionStorage.getItem('user_id');
    const url = `${this.userUrl}/rent`;
    console.log(url)
    const payload = { user_id: userId, bike_id: bikeId };
    console.log(payload)
    return this.http.post(`${this.userUrl}/rent`, payload, this.getHttpOptions());
  }
}
