import { Component, ElementRef, OnInit } from '@angular/core';
import { Manga } from 'src/app/interfaces/manga';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-six-titles',
  templateUrl: './six-titles.component.html',
  styleUrls: ['./six-titles.component.scss'],
})
export class SixTitlesComponent implements OnInit {
  // * variables
  page = 1;
  allManga: Manga[] = [];

  // * constructor
  constructor(private service: MangaService, private el: ElementRef) {}

  // * ngOnInit
  ngOnInit(): void {
    window.scrollTo(-1000, 0);
    this.service.getAll().subscribe((data) => {
      this.allManga = data;
    });
  }

  // * set manga to redirect
  setManga(manga: Manga) {
    this.service.setManga(manga);
  }
}
