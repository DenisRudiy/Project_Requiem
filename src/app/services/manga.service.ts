import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manga } from '../interfaces/manga';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/titles';

  getAll() {
    return this.http.get<Manga[]>(this.url);
  }
}
