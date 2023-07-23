import { Component, ElementRef, OnInit } from '@angular/core';
import { Chapters } from 'src/app/interfaces/chapters';
import { Manga } from 'src/app/interfaces/manga';
import { Pages } from 'src/app/interfaces/pages';
import { AddictionalService } from 'src/app/services/addictional.service';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  currentManga!: Manga;
  page!: number;
  allPages: number[] = [];
  dropdownOpen = false;
  allPhotoPages: Pages[] = [];
  countOfPages!: number;

  constructor(
    private addService: AddictionalService,
    private el: ElementRef,
    private service: MangaService
  ) {}

  ngOnInit(): void {
    window.scrollTo(-1000, 0);
    const storedManga = localStorage.getItem('chosenManga');
    if (storedManga !== null) {
      this.currentManga = JSON.parse(storedManga);
    }
    this.addService.setHeader(false);
    this.addService.setHeader(false);

    this.service.getMangaChapters(1).subscribe((data) => {
      this.countOfPages = data[0].chapterLenght;
      for (let i = 0; i < data[0].chapterLenght; i++) {
        this.allPages.push(i + 1);
      }
    });

    this.service.getChapterParts(1, 1).subscribe((data) => {
      this.allPhotoPages = data;
    });

    const page = sessionStorage.getItem('currentPage');
    if (page) {
      this.page = JSON.parse(page);
    } else {
      this.page = 1;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    const dropdown = this.el.nativeElement.querySelector(
      '.custom-select-wrapper'
    );
    if (this.dropdownOpen == true) {
      dropdown!.style.borderRadius = '5px 5px 0px 0px';
    } else {
      dropdown!.style.borderRadius = '5px';
    }
  }

  changePage(action: number) {
    const dropdown = this.el.nativeElement.querySelector(
      '.custom-select-wrapper'
    );
    if (action === 1001) {
      if (this.page + 1 > this.countOfPages) {
        return;
      } else {
        this.page += 1;
        this.dropdownOpen = false;
        dropdown!.style.borderRadius = '5px';
      }
    } else if (action === 1000) {
      if (this.page !== 1) {
        this.page -= 1;
        this.dropdownOpen = false;
        dropdown!.style.borderRadius = '5px';
      }
    } else {
      this.page = Number(action);
    }
    sessionStorage.setItem('currentPage', JSON.stringify(this.page));
  }
}
