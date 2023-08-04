import { Component, ElementRef, OnInit } from '@angular/core';
import { Manga } from 'src/app/interfaces/manga';
import { AddictionalService } from 'src/app/services/addictional.service';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
})
export class PromoComponent implements OnInit {
  // * variables
  allManga: Manga[] = [];
  names: string[] = [];

  // * constructor
  constructor(
    private service: MangaService,
    private el: ElementRef,
    private addService: AddictionalService
  ) {}

  // * ngOnInit
  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.allManga = data;
    });
  }

  // * set redirect to current manga page
  setManga(manga: Manga) {
    this.service.setManga(manga);
  }

  // * show search field
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
    this.addService.setCloseHeader();
  }

  // * hide search field
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
}
