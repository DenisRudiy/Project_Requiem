import { Component, OnInit } from '@angular/core';
import { Manga } from 'src/app/interfaces/manga';
import { AddictionalService } from 'src/app/services/addictional.service';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  currentManga!: Manga;
  page: number = 1;
  mangas = [
    'https://i.postimg.cc/nVSv2nVq/Shingeki-no-Kyojin-ch131-12-13-RSC-Wze1.jpg',
    'https://i.pinimg.com/750x/16/92/06/169206e021f3eccba3140a40b2ab0566.jpg',
    'https://2.bp.blogspot.com/-268qvYOesAw/V9TWYbSrDmI/AAAAAAACq8U/4rB198dRMUwZYDz-fkJBSlH0Dk8tWyvJACHM/s16000/0512-012.png',
    'https://i.pinimg.com/750x/16/92/06/169206e021f3eccba3140a40b2ab0566.jpg',
    'https://2.bp.blogspot.com/-268qvYOesAw/V9TWYbSrDmI/AAAAAAACq8U/4rB198dRMUwZYDz-fkJBSlH0Dk8tWyvJACHM/s16000/0512-012.png',
    'https://i.pinimg.com/750x/16/92/06/169206e021f3eccba3140a40b2ab0566.jpg',
    'https://2.bp.blogspot.com/-268qvYOesAw/V9TWYbSrDmI/AAAAAAACq8U/4rB198dRMUwZYDz-fkJBSlH0Dk8tWyvJACHM/s16000/0512-012.png',
    'https://i.pinimg.com/750x/16/92/06/169206e021f3eccba3140a40b2ab0566.jpg',
    'https://e0.pxfuel.com/wallpapers/179/99/desktop-wallpaper-fav-pages-bleach-manga-tv.jpg',
    'https://m.media-amazon.com/images/I/91drpJpVp0L._AC_UF1000,1000_QL80_.jpg',
    'https://64.media.tumblr.com/41477ee9a114bf95acb71f1d08944b2c/812bf9eb618e388e-70/s1280x1920/196a295613aab8f40591cd64b77197ce1a8ff88b.jpg',
    'https://e0.pxfuel.com/wallpapers/179/99/desktop-wallpaper-fav-pages-bleach-manga-tv.jpg',
    'https://m.media-amazon.com/images/I/91drpJpVp0L._AC_UF1000,1000_QL80_.jpg',
    'https://64.media.tumblr.com/41477ee9a114bf95acb71f1d08944b2c/812bf9eb618e388e-70/s1280x1920/196a295613aab8f40591cd64b77197ce1a8ff88b.jpg',
  ];
  constructor(private addService: AddictionalService) {}

  ngOnInit(): void {
    window.scrollTo(-1000, 0);
    const storedManga = localStorage.getItem('chosenManga');
    if (storedManga !== null) {
      this.currentManga = JSON.parse(storedManga);
    }
    this.addService.setHeader(false);
    this.addService.setHeader(false);
  }

  changePage(action: string) {
    console.log('hello');
    if (action === 'next') {
      this.page += 1;
    } else {
      this.page -= 1;
    }
  }
}
