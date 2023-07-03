import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Manga } from 'src/app/interfaces/manga';
import { User } from 'src/app/interfaces/user';
import { MangaService } from 'src/app/services/manga.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  // * variables
  clickEventSubscription!: Subscription;
  loggedUser: User = new User();
  detail_page = 'details';
  userManga: Manga[] = [];

  // * constructor
  constructor(
    private service: UserService,
    private mangaService: MangaService
  ) {}

  // * ngOnInit
  ngOnInit(): void {
    const loggedUser = localStorage.getItem('chosenUser');
    if (loggedUser !== null) {
      this.loggedUser = JSON.parse(loggedUser);
    }
    this.mangaService.getAll().subscribe((data) => {
      for (let i = 0; i < this.loggedUser.lastRead.length; i++) {
        this.userManga.push(data[this.loggedUser.lastRead[i]]);
      }
      console.log(this.userManga);
    });
  }

  // * ngAfterViewInit
  ngAfterViewInit(): void {
    // * for frames
    const carousel = document.querySelector('.images') as HTMLElement | null;
    let isDragStart = false,
      prevPageX: number,
      prevScrollLeft: number;

    // updating global variables on mouse down event
    const DragStart = (e: MouseEvent) => {
      isDragStart = true;
      prevPageX = e.pageX;
      prevScrollLeft = carousel!.scrollLeft;
    };
    const dragStop = () => {
      isDragStart = false;
    };
    // scrolling images/carousel to left according to mouse pointer
    const dragging = (e: MouseEvent) => {
      if (carousel !== null) {
        if (!isDragStart) return;
        e.preventDefault();
        let positionDiff = e.pageX - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
      }
    };
    carousel!.addEventListener('mousedown', DragStart);
    carousel!.addEventListener('mousemove', dragging);
    carousel!.addEventListener('mouseup', dragStop);

    // * for titles
    const titles = document.querySelector(
      '.title_images'
    ) as HTMLElement | null;

    let isDragStartT = false,
      prevPageXT: number,
      prevScrollLeftT: number;

    const DragStartT = (e: MouseEvent) => {
      isDragStartT = true;
      prevPageXT = e.pageX;
      prevScrollLeftT = titles!.scrollLeft;
    };
    const dragStopT = () => {
      isDragStartT = false;
    };
    const draggingT = (e: MouseEvent) => {
      if (titles !== null) {
        if (!isDragStartT) return;
        e.preventDefault();
        let positionDiff = e.pageX - prevPageXT;
        titles.scrollLeft = prevScrollLeftT - positionDiff;
      }
    };
    titles!.addEventListener('mousedown', DragStartT);
    titles!.addEventListener('mousemove', draggingT);
    titles!.addEventListener('mouseup', dragStopT);
  }

  // * change page
  changePage(page: string) {
    this.detail_page = page;
  }

  setManga(manga: Manga) {
    this.mangaService.setManga(manga);
  }
}
