import { Component, HostListener, OnInit } from '@angular/core';
import { AddictionalService } from './services/addictional.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Project_Requiem';
  showHeader = true;
  clickEventSubscription!: Subscription;

  constructor(private addService: AddictionalService) {
    this.clickEventSubscription = this.addService.getHeader().subscribe(() => {
      const storedManga = localStorage.getItem('openHeader');
      if (storedManga !== null) {
        this.showHeader = JSON.parse(storedManga);
        console.log(this.showHeader);
      }
    });
  }

  @HostListener('click', ['$event'])
  onKeyDown(event: MouseEvent) {
    const storedManga = localStorage.getItem('openHeader');
    if (storedManga !== null) {
      this.showHeader = JSON.parse(storedManga);
      console.log(this.showHeader);
    }
  }

  ngOnInit(): void {}
}
