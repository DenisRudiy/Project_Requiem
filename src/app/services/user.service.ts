import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // * variables
  url = 'http://localhost:3000/users';
  private loggedUser = new Subject<User>();
  private subject = new Subject<any>();

  // * constructor
  constructor(private http: HttpClient) {
    const chosenUser = localStorage.getItem('chosenUser');
    if (chosenUser) {
      const manga = JSON.parse(chosenUser);
      this.loggedUser.next(manga);
    }
  }

  // * CRUD functions
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/create`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<User>(`${this.url}/update/${user.id}`, user);
  }

  // * get/set functions
  setLogUser(user: User) {
    this.loggedUser.next(user);
    localStorage.setItem('chosenUser', JSON.stringify(user));
  }

  getLogUser(): Observable<User> {
    return this.loggedUser.asObservable();
  }

  sendClickEvent() {
    this.subject.next(1);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
