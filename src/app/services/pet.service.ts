import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pet } from '../interfaces/pet';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private myUrl: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.myUrl = environment.apiUrl;
    this.apiUrl = 'api/pets';
  }

  getPets(): Observable<Pet[]>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}` )
    return this.http.get<Pet[]>(`${this.myUrl}${this.apiUrl}`, {headers: headers});
  }

  postPets(pet: Pet): Observable<any> {
    return this.http.post(`${this.myUrl}${this.apiUrl}`, pet);
  }
}
