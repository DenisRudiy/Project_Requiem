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
    return this.http.get<Manga[]>(this.url + '/manga/get');
  }
  getMangaByID(id: number) {
    return this.http.get<Manga[]>(this.url + '/manga/get' + `/${id}`);
  }
  createManga(manga: Manga): Observable<Manga> {
    return this.http.post<Manga>(`${this.url}/manga/create`, manga);
  }

  getAllMangaChapters() {
    return this.http.get<Chapters[]>(this.url + '/chapters/get');
  }
  getMangaChapters(id: number) {
    return this.http.get<Chapters[]>(this.url + '/chapters/get' + `/${id}`);
  }
  createChapter(chapter: Chapters): Observable<Chapters> {
    return this.http.post<Chapters>(`${this.url}/chapters/create`, chapter);
  }

  getChapterParts(id: number, chapter_id: number) {
    return this.http.get<Pages[]>(
      this.url + '/chapters/get' + `/${id}/${chapter_id}`
    );
  }
  createPage(page: Pages): Observable<Pages> {
    return this.http.post<Pages>(`${this.url}/pages/create`, page);
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
