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
  names: string[] = [];
  constructor(private service: MangaService, private el: ElementRef) {}

  ngOnInit(): void {
    window.scrollTo(-1000, 0);
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

  setManga(manga: Manga) {
    this.service.setManga(manga);
  }

  scrollToTop() {
    window.scrollTo(-1000, 0);
  }

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
}
