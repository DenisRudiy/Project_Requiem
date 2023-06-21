import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Manga } from 'src/app/interfaces/manga';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss'],
})
export class TitlesComponent implements OnInit {
  // init variables
  public screenWidth: any;
  allManga: Manga[] = [];
  countOfTitles = 12;
  page = 1;
  maxSizePages = 10;
  countOfPages = 1;
  constructor(private service: MangaService, private el: ElementRef) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.allManga = data;
    });
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 1500) {
      this.countOfTitles = 6;
      this.maxSizePages = 5;
    } else if (this.screenWidth > 1500) {
      this.countOfTitles = 12;
      this.maxSizePages = 10;
    }

    if (this.allManga.length % 12 != 0) {
      this.countOfPages = Math.trunc(this.allManga.length / 12) + 1;
    } else {
      this.countOfPages = this.allManga.length / 12;
    }
  }

  // init functions

  ClickOnSearch() {
    const search = (<HTMLElement>this.el.nativeElement).querySelector(
      '.pi-search'
    );
    search!.classList.add('bounce');
    setTimeout(function () {
      search!.classList.remove('bounce');
    }, 200);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 1500) {
      this.countOfTitles = 6;
      this.maxSizePages = 5;
    } else if (this.screenWidth > 1500) {
      this.countOfTitles = 12;
      this.maxSizePages = 10;
      if (this.allManga.length % 12 !== this.countOfPages && this.page !== 1) {
        this.page -= 1;
      }
    }
  }
}
