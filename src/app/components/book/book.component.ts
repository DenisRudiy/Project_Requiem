import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { Manga } from 'src/app/interfaces/manga';
import { Pages } from 'src/app/interfaces/pages';
import { AddictionalService } from 'src/app/services/addictional.service';
import { MangaService } from 'src/app/services/manga.service';
import { Router } from '@angular/router';
import { Chapters } from 'src/app/interfaces/chapters';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  //* variables
  currentManga!: Manga;
  page!: number;
  allPages: number[] = [];
  allChapters: Chapters[] = [];
  dropdownOpen = false;
  chaptersOpen = false;
  allPhotoPages: Pages[] = [];
  loadedImages: number = 0;
  countOfPages!: number;
  currMangaId!: number;
  startedChapter: number = 0;
  isLoading: boolean = false;
  countOfChapters: number = 1;

  // * constructor
  constructor(
    private addService: AddictionalService,
    private el: ElementRef,
    private service: MangaService,
    private router: Router
  ) {}

  @ViewChildren('imageElements') imageElements: ElementRef[] = [];

  // * ngOnInit
  ngOnInit(): void {
    window.scrollTo(-1000, 0);
    this.addService.setHeader(false);
    const storedManga = localStorage.getItem('chosenManga');
    if (storedManga !== null) {
      this.currentManga = JSON.parse(storedManga);
      this.currMangaId = this.currentManga.id;
    }

    const chapter = sessionStorage.getItem('currentChapter');
    if (chapter) {
      this.startedChapter = JSON.parse(chapter);
    } else {
      this.startedChapter = 0;
    }

    this.service.getMangaChapters(this.currMangaId).subscribe((data) => {
      this.countOfChapters = data.length;
      this.allChapters = data;
      this.countOfPages = data[this.startedChapter].chapterLenght;
      for (let i = 0; i < data[this.startedChapter].chapterLenght; i++) {
        this.allPages.push(i + 1);
      }
    });

    this.service
      .getChapterParts(this.currMangaId, this.startedChapter + 1)
      .subscribe((data) => {
        this.allPhotoPages = data;
      });

    const page = sessionStorage.getItem('currentPage');
    if (page) {
      this.page = JSON.parse(page);
    } else {
      this.page = 1;
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.changePage(1000);
    } else if (event.key === 'ArrowRight') {
      this.changePage(1001);
    }
  }

  // * Activate dropdown to select page
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

  // * Activate dropdown to select page
  toggleChapters() {
    this.chaptersOpen = !this.chaptersOpen;
    const dropdown = this.el.nativeElement.querySelector('.chapters');
    if (this.chaptersOpen == true) {
      dropdown!.style.borderRadius = '5px 5px 0px 0px';
    } else {
      dropdown!.style.borderRadius = '5px';
    }
  }

  // * Change Page
  changePage(action: number) {
    const dropdown = this.el.nativeElement.querySelector(
      '.custom-select-wrapper'
    );
    if (action === 1001) {
      if (this.page + 1 > this.countOfPages) {
        this.nextChapter();
      } else {
        this.page += 1;
        this.dropdownOpen = false;
        dropdown!.style.borderRadius = '5px';
        console.log(this.page);
      }
    } else if (action === 1000) {
      if (this.page !== 1) {
        this.page -= 1;
        this.dropdownOpen = false;
        dropdown!.style.borderRadius = '5px';
        console.log(this.page);
      } else {
        this.prevChapter();
      }
    } else {
      this.page = Number(action);
    }
    sessionStorage.setItem('currentPage', JSON.stringify(this.page));
  }

  // * Reset Page
  resetPage() {
    sessionStorage.setItem('currentPage', JSON.stringify(1));
    this.router.navigate(['/currentManga']);
  }

  // * Next Chapter
  nextChapter() {
    if (this.countOfChapters > this.startedChapter + 1) {
      this.isLoading = true;

      this.service.getMangaChapters(this.currMangaId).subscribe((data) => {
        this.startedChapter += 1;
        this.countOfPages = data[this.startedChapter].chapterLenght;
        this.allPages = [];
        for (let i = 0; i < data[this.startedChapter].chapterLenght; i++) {
          this.allPages.push(i + 1);
        }
        this.service
          .getChapterParts(this.currMangaId, this.startedChapter + 1)
          .subscribe((data) => {
            this.allPhotoPages = data;
          });

        this.page = 1;
        setTimeout(() => {
          sessionStorage.setItem('currentPage', JSON.stringify(1));
          sessionStorage.setItem(
            'currentChapter',
            JSON.stringify(this.startedChapter)
          );
        }, 1000);
      });

      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
  }

  // * Previous Chapter
  prevChapter() {
    if (this.startedChapter > 0) {
      this.isLoading = true;

      this.service.getMangaChapters(this.currMangaId).subscribe((data) => {
        this.startedChapter -= 1;
        this.countOfPages = data[this.startedChapter].chapterLenght;
        this.allPages = [];
        for (let i = 0; i < data[this.startedChapter].chapterLenght; i++) {
          this.allPages.push(i + 1);
        }
      });
      this.service
        .getChapterParts(this.currMangaId, this.startedChapter)
        .subscribe((data) => {
          this.allPhotoPages = data;
        });

      this.page = 1;
      setTimeout(() => {
        sessionStorage.setItem('currentPage', JSON.stringify(1));
        sessionStorage.setItem(
          'currentChapter',
          JSON.stringify(this.startedChapter)
        );
      }, 1000);

      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
  }

  // * Change Chapter
  changeChapter(chapter: Chapters) {
    this.isLoading = true;
    this.startedChapter = chapter.chapterNumber - 1;
    this.allPages = [];
    for (let i = 0; i < chapter.chapterLenght; i++) {
      this.allPages.push(i + 1);
    }
    this.service
      .getChapterParts(this.currMangaId, chapter.chapterNumber)
      .subscribe((data) => {
        this.allPhotoPages = data;
      });
    this.page = 1;
    setTimeout(() => {
      sessionStorage.setItem('currentPage', JSON.stringify(1));
      sessionStorage.setItem(
        'currentChapter',
        JSON.stringify(this.startedChapter)
      );
    }, 1000);
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}
