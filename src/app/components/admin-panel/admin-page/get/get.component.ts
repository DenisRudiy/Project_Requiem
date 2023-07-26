import { Component, Input, OnInit } from '@angular/core';
import { Chapters } from 'src/app/interfaces/chapters';
import { Manga } from 'src/app/interfaces/manga';
import { User } from 'src/app/interfaces/user';
import { MangaService } from 'src/app/services/manga.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss'],
})
export class GetComponent implements OnInit {
  allManga: Manga[] = [];
  allChapters: Chapters[] = [];
  allUsers: User[] = [];
  type: String = 'manga';
  chaptersOpen = false;

  constructor(
    private service: MangaService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.allManga = data;
    });
  }

  getCurrentMangaChapters(title: Manga) {
    this.service.getMangaChapters(title.id).subscribe((data) => {
      this.allChapters = data;
    });
    this.changeType('chapters');
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.allUsers = data;
    });
    this.changeType('users');
  }

  changeType(type: String) {
    this.type = type;
  }

  chaptersDropdown() {
    this.chaptersOpen = !this.chaptersOpen;
  }
}
