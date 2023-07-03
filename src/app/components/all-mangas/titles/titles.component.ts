import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Manga } from 'src/app/interfaces/manga';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss'],
})
export class TitlesComponent implements OnInit {
  // * variables
  public screenWidth: any;
  allManga: Manga[] = [];
  sortedManga: Manga[] = [];
  countOfTitles = 12;
  page = 1;
  maxSizePages = 10;
  countOfPages = 1;
  names: string[] = [];

  // * constructor
  constructor(private service: MangaService, private el: ElementRef) {}

  // * ngOnInit
  ngOnInit(): void {
    window.scrollTo(-1000, 0);
    this.service.getAll().subscribe((data) => {
      this.allManga = data;

      const sortedManga = sessionStorage.getItem('sorting');
      if (sortedManga !== null && sortedManga?.length !== 2) {
        this.sortedManga = JSON.parse(sortedManga);
      } else {
        this.sortedManga = this.allManga;
        this.filterList('all');
      }
    });
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1980) {
      this.countOfTitles = 12;
      this.maxSizePages = 10;
    } else if (this.screenWidth <= 1980 && this.screenWidth > 1500) {
      this.countOfTitles = 10;
      this.maxSizePages = 10;
    } else if (this.screenWidth <= 1500) {
      this.countOfTitles = 6;
      this.maxSizePages = 5;
    }

    if (this.allManga.length % 12 != 0) {
      this.countOfPages = Math.trunc(this.allManga.length / 12) + 1;
    } else {
      this.countOfPages = this.allManga.length / 12;
    }

    setTimeout(() => {
      const lastPage = sessionStorage.getItem('lastPage');
      if (lastPage !== null) {
        console.log();

        if (Math.trunc(this.allManga.length / 12) + 1 >= parseInt(lastPage)) {
          this.page = JSON.parse(lastPage);
        } else {
          this.page = 1;
        }
      }
    }, 50);
  }

  // * hide header
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1980) {
      this.countOfTitles = 12;
      this.maxSizePages = 10;
      if (this.allManga.length % 12 !== this.countOfPages && this.page !== 1) {
        this.page = Math.round(this.allManga.length / 12);
      }
    } else if (this.screenWidth <= 1980 && this.screenWidth > 1500) {
      this.countOfTitles = 10;
      this.maxSizePages = 10;
    } else if (this.screenWidth <= 1500) {
      this.countOfTitles = 6;
      this.maxSizePages = 5;
    }
  }

  // * set redirect to current manga page
  setManga(manga: Manga) {
    this.service.setManga(manga);
  }

  // * save current page to sessionStorage
  changePage() {
    sessionStorage.setItem('lastPage', JSON.stringify(this.page));
    window.scrollTo(-1000, 0);
  }

  // * show search block
  ClickOnSearch() {
    const search = (<HTMLElement>this.el.nativeElement).querySelector(
      '.pi-search'
    );
    const result = (<HTMLElement>this.el.nativeElement).querySelector(
      '.result'
    );
    const overlay = (<HTMLElement>this.el.nativeElement).querySelector(
      '.overlay_blured'
    );
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = 'hidden';
      result!.classList.remove('hidden');
      overlay!.classList.remove('hidden');
      search!.classList.add('bounce');
      setTimeout(function () {
        search!.classList.remove('bounce');
      }, 200);
    }
  }

  // * hide search block
  hideSearch() {
    const result = (<HTMLElement>this.el.nativeElement).querySelector(
      '.result'
    );
    const overlay = (<HTMLElement>this.el.nativeElement).querySelector(
      '.overlay_blured'
    );
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = 'scroll';
      result!.classList.add('hidden');
      overlay!.classList.add('hidden');
    }
  }

  // * search work
  onInputChange() {
    const input = this.el.nativeElement.querySelector('.search').value;
    let names = [];
    for (let j = 0; j < this.allManga.length; j++) {
      let name = '';
      for (let i = 0; i < input.length; i++) {
        if (this.allManga[j].name[i].toLowerCase() !== input[i].toLowerCase()) {
          name = '';
          break;
        }
        name += this.allManga[j].name[i];
      }
      if (name !== '') {
        names.push(this.allManga[j].name);
      }
    }
    this.names = names;
  }

  // * redirect to searched manga
  getMangaByName(name: string) {
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = 'scroll';
      for (let i = 0; i < this.allManga.length; i++) {
        if (this.allManga[i].name === name) {
          this.setManga(this.allManga[i]);
          break;
        }
      }
    }
  }

  // * filter manga list
  filterList(option: string) {
    if (option === 'all') {
      this.sortedManga = this.allManga;
      sessionStorage.setItem('sorting', JSON.stringify(this.sortedManga));
    } else if (option === 'rating') {
      let rating: number[] = [];
      this.sortedManga = [];
      for (let i = 0; i < this.allManga.length; i++) {
        rating.push(this.allManga[i].rating);
      }
      rating.sort(function (a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      });
      for (let i = 0; i < this.allManga.length; i++) {
        for (let j = 0; j < this.allManga.length; j++) {
          if (
            this.allManga[j].rating === rating[i] &&
            this.sortedManga.includes(this.allManga[j]) === false
          ) {
            this.sortedManga.push(this.allManga[j]);
            break;
          }
        }
      }
      sessionStorage.setItem('sorting', JSON.stringify(this.sortedManga));
    } else {
      this.sortedManga = [];
      for (let i = 0; i < this.allManga.length; i++) {
        if (this.allManga[i].genre.includes(option) === true) {
          this.sortedManga.push(this.allManga[i]);
        }
      }
      sessionStorage.setItem('sorting', JSON.stringify(this.sortedManga));
      this.page = 1;
    }
  }
}
