import { Component, ElementRef, OnInit } from '@angular/core';
import { Manga } from 'src/app/interfaces/manga';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-six-titles',
  templateUrl: './six-titles.component.html',
  styleUrls: ['./six-titles.component.scss'],
})
export class SixTitlesComponent implements OnInit {
  // init variables
  allManga: Manga[] = [];
  constructor(private service: MangaService, private el: ElementRef) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.allManga = data;
    });
  }
}
