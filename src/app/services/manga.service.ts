import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manga } from '../interfaces/manga';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  // init variables
  url = 'http://localhost:3000/titles';
  private currentManga = new Subject<Manga>();

  constructor(private http: HttpClient) {
    const chosenManga = localStorage.getItem('chosenManga');
    if (chosenManga) {
      const manga = JSON.parse(chosenManga);
      this.currentManga.next(manga);
    }
  }

  // init functions

  getAll() {
    return this.http.get<Manga[]>(this.url);
  }

  setManga(manga: Manga) {
    this.currentManga.next(manga);
    localStorage.setItem('chosenManga', JSON.stringify(manga));
  }

  getManga(): Observable<Manga> {
    return this.currentManga.asObservable();
  }
}
