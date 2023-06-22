import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Manga } from 'src/app/interfaces/manga';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-item-review',
  templateUrl: './item-review.component.html',
  styleUrls: ['./item-review.component.scss'],
})
export class ItemReviewComponent implements OnInit {
  // * variables
  currentManga!: Manga;
  allManga: Manga[] = [];
  mangaLength = 0;
  sameManga: Manga[] = [];
  sameTitles: [] = [];
  clickEventSubscription!: Subscription;

  // * OnInit
  ngOnInit(): void {
    const storedManga = localStorage.getItem('chosenManga');
    if (storedManga !== null) {
      this.currentManga = JSON.parse(storedManga);
      this.sameTitles = this.currentManga.sameTitles;
    }
    this.service.getAll().subscribe((data) => {
      this.allManga = data;
      this.mangaLength = data.length;

      let mangaItem = 0;
      for (let i = 0; i < this.mangaLength; i++) {
        if (this.allManga[i].id == this.sameTitles[mangaItem]) {
          this.sameManga[mangaItem] = this.allManga[i];
          mangaItem++;
        }
      }
    });
  }

  // * constructor
  constructor(private service: MangaService) {
    this.clickEventSubscription = this.service
      .getManga()
      .subscribe((data: Manga) => {
        this.currentManga = data;
        this.sameManga = this.currentManga.sameTitles;
      });
  }

  // setManga(manga: Manga) {
  //   this.service.setManga(manga);
  // }

  // routerLink="currentManga"
  //             (click)="setManga(same)"
}
