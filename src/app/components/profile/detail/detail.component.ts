import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  ) {
    this.clickEventSubscription = this.service
      .getLogUser()
      .subscribe((data: User) => {
        localStorage.setItem('chosenUser', JSON.stringify(data));
        this.loggedUser.favorite = [];
        this.loggedUser.lastRead = [];
        this.loggedUser = data;
        console.log(this.loggedUser);
        if (this.loggedUser.status == 'logged') {
          this.userManga = [];
          this.mangaService.getAll().subscribe((data) => {
            for (let i = 0; i < this.loggedUser.lastRead.length; i++) {
              this.userManga.push(data[this.loggedUser.lastRead[i]]);
            }
          });
          this.detail_page = 'details';
        } else {
          this.detail_page = 'none';
        }
      });
  }

  // * ngOnInit
  ngOnInit(): void {
    const loggedUser = localStorage.getItem('chosenUser');
    if (loggedUser !== null) {
      this.loggedUser = JSON.parse(loggedUser);
      if (this.loggedUser.status == 'unlogged') {
        this.detail_page = 'none';
      }
    }
    this.mangaService.getAll().subscribe((data) => {
      for (let i = 0; i < this.loggedUser.lastRead.length; i++) {
        this.userManga.push(data[this.loggedUser.lastRead[i]]);
      }
    });
  }

  clickRight() {
    const titles = document.querySelector(
      '.titles_carousel'
    ) as HTMLElement | null;
    if (titles !== null) {
      const scrollAmount = 200;
      const duration = 200;

      const startPosition = titles.scrollLeft;
      const targetPosition = startPosition + scrollAmount;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();

      function scrollToSmoothly(timestamp: number) {
        const currentTime = timestamp || performance.now();
        const elapsedTime = currentTime - startTime;
        const scrollProgress = Math.min(elapsedTime / duration, 1);
        const scrollPosition = startPosition + distance * scrollProgress;

        titles!.scrollLeft = scrollPosition;

        if (scrollProgress < 1) {
          window.requestAnimationFrame(scrollToSmoothly);
        }
      }

      window.requestAnimationFrame(scrollToSmoothly);
    }
  }

  clickLeft() {
    const titles = document.querySelector(
      '.titles_carousel'
    ) as HTMLElement | null;
    if (titles !== null) {
      const scrollAmount = -200;
      const duration = 200;

      const startPosition = titles.scrollLeft;
      const targetPosition = startPosition + scrollAmount;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();

      function scrollToSmoothly(timestamp: number) {
        const currentTime = timestamp || performance.now();
        const elapsedTime = currentTime - startTime;
        const scrollProgress = Math.min(elapsedTime / duration, 1);
        const scrollPosition = startPosition + distance * scrollProgress;

        titles!.scrollLeft = scrollPosition;

        if (scrollProgress < 1) {
          window.requestAnimationFrame(scrollToSmoothly);
        }
      }

      window.requestAnimationFrame(scrollToSmoothly);
    }
  }

  // * change page
  changePage(page: string) {
    this.detail_page = page;
  }

  setManga(manga: Manga) {
    this.mangaService.setManga(manga);
  }

  openLogField() {
    this.service.sendClickEvent();
  }
}
