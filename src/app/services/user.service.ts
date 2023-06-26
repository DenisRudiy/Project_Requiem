import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}
