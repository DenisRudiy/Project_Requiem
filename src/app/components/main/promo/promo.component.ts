import { Component, ElementRef, OnInit } from '@angular/core';
import { Manga } from 'src/app/interfaces/manga';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
})
export class PromoComponent implements OnInit {
  // init variables
  allManga: Manga[] = [];
  names: string[] = [];
  constructor(private service: MangaService, private el: ElementRef) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.allManga = data;
    });
  }

  // init functions

  setManga(manga: Manga) {
    this.service.setManga(manga);
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
