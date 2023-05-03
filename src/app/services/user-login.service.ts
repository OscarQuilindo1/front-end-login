import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../interfaces/userLogin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  private myUrl: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.myUrl = environment.apiUrl;
    this.apiUrl = 'api/users';
  }
  signIn(user: UserLogin): Observable<any> {
    return this.http.post(`${this.myUrl}${this.apiUrl}`, user);
  }
  login(user: UserLogin): Observable<string> {
    return this.http.post<string>(`${this.myUrl}${this.apiUrl}/login`, user);
  }
}
