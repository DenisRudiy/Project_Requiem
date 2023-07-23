import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manga } from '../interfaces/manga';
import { Observable, Subject } from 'rxjs';
import { Chapters } from '../interfaces/chapters';
import { Pages } from '../interfaces/pages';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  // * variables
  url = 'http://localhost:3000';
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

  getMangaChapters(id: number) {
    return this.http.get<Chapters[]>(this.url + `/${id}`);
  }
  getChapterParts(id: number, chapter_id: number) {
    return this.http.get<Pages[]>(this.url + `/${id}/${chapter_id}`);
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
