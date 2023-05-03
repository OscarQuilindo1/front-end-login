import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myUrl: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.myUrl = environment.apiUrl;
    this.apiUrl = 'api/users';
  }
  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myUrl}${this.apiUrl}`, user);
  }
  login(user: User): Observable<string>{
    return this.http.post<string>(`${this.myUrl}${this.apiUrl}/login`, user);
  }
}
