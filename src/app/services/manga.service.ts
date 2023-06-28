import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manga } from '../interfaces/manga';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  // * variables
  url = 'http://localhost:3000/titles';
  private currentManga = new Subject<Manga>();

  // * constructor
  constructor(private http: HttpClient) {
    const chosenManga = localStorage.getItem('chosenManga');
    if (chosenManga) {
      const manga = JSON.parse(chosenManga);
      this.currentManga.next(manga);
    }
  }

  // * CRUD functions
  getAll() {
    return this.http.get<Manga[]>(this.url);
  }

  // * get/set functions
  setManga(manga: Manga) {
    this.currentManga.next(manga);
    localStorage.setItem('chosenManga', JSON.stringify(manga));
  }

  getManga(): Observable<Manga> {
    return this.currentManga.asObservable();
  }
}
