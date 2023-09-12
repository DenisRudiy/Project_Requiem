import { Component, ElementRef, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Chapters } from 'src/app/interfaces/chapters';
import { Manga } from 'src/app/interfaces/manga';
import { Pages } from 'src/app/interfaces/pages';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [MessageService],
})
export class EditFormComponent implements OnInit {
  // * variables
  tableType: String = 'manga';
  newManga: Manga = new Manga();
  newChapter: Chapters = new Chapters();
  newPage: Pages = new Pages();
  lastID!: number;
  lastChapterID!: number;
  genres: string[] = [
    'shonen',
    'seinen',
    'action',
    'fantasy',
    'dark fantasy',
    'detective',
    'supernatural',
    'war drama',
    'adventure',
  ];
  selectedGenres: string[] = [];
  allMangaID: number[] = [];
  allMangaChapters: Chapters[] = [];
  selectedManga: number = -2;
  selectedChapter: Chapters = new Chapters();
  genresOpen: boolean = false;
  previewOpen: boolean = false;
  titlesOpen: boolean = false;
  chapterOpen: boolean = false;
  pgManga: boolean = false;
  pgChapter: boolean = false;

  // * constructor
  constructor(
    private el: ElementRef,
    private messageService: MessageService,
    private service: MangaService
  ) {}

  // * ngOnInit
  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.lastID = data.length;
      for (let i = 0; i < this.lastID; i++) {
        this.allMangaID.push(data[i].id);
      }
    });
    this.service.getAllMangaChapters().subscribe((data) => {
      this.lastChapterID = data.length;
    });
  }

  // * change Add Fileds
  changeTableType(type: String) {
    this.tableType = type;
  }

  // * dropdowns
  switchDropdown(variable: boolean, element: string) {
    variable = !variable;
    const dropdown = this.el.nativeElement.querySelector(`.${element}`);
    if (variable == true) {
      dropdown!.style.borderRadius = '10px 10px 0px 0px';
    } else {
      dropdown!.style.borderRadius = '10px';
    }
  }

  // * add selected genres to current list
  addToGenreList(data: string) {
    if (this.selectedGenres.includes(data)) {
      const del = this.selectedGenres.indexOf(data);
      this.selectedGenres = this.selectedGenres
        .slice(0, del)
        .concat(this.selectedGenres.slice(del + 1));
    } else {
      this.selectedGenres.push(data);
    }
  }

  takeAllChapters(id: number) {
    this.selectedManga = id;
    this.service.getMangaChapters(id).subscribe((data) => {
      this.allMangaChapters = data;
    });
  }

  // * Create New Manga
  addManga() {
    const name = this.el.nativeElement.querySelector('.name');
    const img = this.el.nativeElement.querySelector('.img');
    const wallpaper = this.el.nativeElement.querySelector('.wallpaper');
    const rating = this.el.nativeElement.querySelector('.rating');
    const toms = this.el.nativeElement.querySelector('.toms');
    const description = this.el.nativeElement.querySelector('.description');
    const author = this.el.nativeElement.querySelector('.author');
    const status = this.el.nativeElement.querySelector('.status');
    const prev1 = this.el.nativeElement.querySelector('.img1');
    const prev2 = this.el.nativeElement.querySelector('.img2');
    const prev3 = this.el.nativeElement.querySelector('.img3');
    const prev4 = this.el.nativeElement.querySelector('.img4');
    const title1 = this.el.nativeElement.querySelector('.titles1');
    const title2 = this.el.nativeElement.querySelector('.titles2');
    const title3 = this.el.nativeElement.querySelector('.titles3');
    const title4 = this.el.nativeElement.querySelector('.titles4');
    if (
      name.value == '' ||
      img.value == '' ||
      wallpaper.value == '' ||
      this.selectedGenres.length == 0 ||
      rating.value == '' ||
      rating.value < 0 ||
      toms.value == '' ||
      toms.value < 0 ||
      description.value == '' ||
      author.value == '' ||
      status.value == '' ||
      prev1.value == '' ||
      prev2.value == '' ||
      prev3.value == '' ||
      prev4.value == '' ||
      title1.value == '' ||
      title2.value == '' ||
      title3.value == '' ||
      title4.value == ''
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Type all Data',
      });
    } else {
      this.lastID += 1;
      const preview: string[] = [];
      const sameTitles = [];
      preview.push(prev1.value);
      preview.push(prev2.value);
      preview.push(prev3.value);
      preview.push(prev4.value);
      sameTitles.push(title1.value);
      sameTitles.push(title2.value);
      sameTitles.push(title3.value);
      sameTitles.push(title4.value);
      this.newManga.id = this.lastID;
      this.newManga.name = name.value;
      this.newManga.img = img.value;
      this.newManga.wallpaper = wallpaper.value;
      this.newManga.genre = this.selectedGenres;
      this.newManga.rating = rating.value;
      this.newManga.toms = toms.value;
      this.newManga.description = description.value;
      this.newManga.author = author.value;
      this.newManga.status = status.value;
      this.newManga.preview = preview;
      this.newManga.sameTitles = sameTitles;
      this.newManga.parts = [];

      this.service.createManga(this.newManga).subscribe((data) => {});
    }
  }

  // * Create New Chapter
  addChapter() {
    this.lastChapterID += 1;
    const chapterNumber = this.el.nativeElement.querySelector('.chapterNumber');
    const chapterLength = this.el.nativeElement.querySelector('.chapterLength');
    if (
      chapterNumber.value == 0 ||
      chapterLength == 0 ||
      this.selectedManga == -2
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Type all Data',
      });
    } else {
      this.newChapter.id = this.lastChapterID;
      this.newChapter.manga_id = this.selectedManga;
      this.newChapter.chapterNumber = chapterNumber.value;
      this.newChapter.chapterLenght = chapterLength.value;
      this.service.createChapter(this.newChapter).subscribe((data) => {});
    }
  }

  // * Create New Page
  addPage() {
    const pageNumber = this.el.nativeElement.querySelector('.pageNumber');
    const photoPage = this.el.nativeElement.querySelector('.photoPage');
    if (
      pageNumber.value == '' ||
      photoPage == '' ||
      this.selectedChapter == undefined ||
      this.selectedManga == -2
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Type all Data',
      });
    } else {
      if (parseInt(pageNumber.value) > this.selectedChapter.chapterLenght) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "You're exceeding the number of pages",
        });
      } else {
        this.newPage.manga_id = this.selectedManga;
        this.newPage.chapterNumber = this.selectedChapter.chapterNumber;
        this.newPage.pageNumber = parseInt(pageNumber.value);
        this.newPage.pageImage = photoPage.value;
        this.service.createPage(this.newPage).subscribe((data) => {});
        this.el.nativeElement.querySelector('.pageNumber').value = 0;
        this.el.nativeElement.querySelector('.photoPage').value = '';
      }
    }
  }
}
