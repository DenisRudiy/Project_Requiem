import { Component, OnInit } from '@angular/core';
import { Manga } from 'src/app/interfaces/manga';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  // * variables
  window: String = 'get';
  jsonData: Manga[] = [];

  // * constructor
  constructor(private service: MangaService) {}

  // * NgOnInit
  ngOnInit(): void {}
}
