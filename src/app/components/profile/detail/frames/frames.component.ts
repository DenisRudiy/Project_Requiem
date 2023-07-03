import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss'],
})
export class FramesComponent implements OnInit {
  // * variables
  clickEventSubscription!: Subscription;
  loggedUser: User = new User();
  page = 1;
  public screenWidth: any;
  maxSizePages = 10;
  countOfTitles = 1;
  countOfPages = 1;

  // * constructor
  constructor(private service: UserService) {}

  // * ngOnInit
  ngOnInit(): void {
    const loggedUser = localStorage.getItem('chosenUser');
    if (loggedUser !== null) {
      this.loggedUser = JSON.parse(loggedUser);
    }

    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1980) {
      this.countOfTitles = 12;
      this.maxSizePages = 10;
    } else if (this.screenWidth <= 1980 && this.screenWidth > 1650) {
      this.countOfTitles = 10;
      this.maxSizePages = 10;
    } else if (this.screenWidth <= 1650) {
      this.countOfTitles = 6;
      this.maxSizePages = 5;
    }
  }

  // * fix size of window
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1980) {
      this.countOfTitles = 12;
      this.maxSizePages = 10;
      if (
        this.loggedUser.favorite.length % 12 !== this.countOfPages &&
        this.page !== 1
      ) {
        this.page = Math.round(this.loggedUser.favorite.length / 12);
      }
    } else if (this.screenWidth <= 1980 && this.screenWidth > 1650) {
      this.countOfTitles = 10;
      this.maxSizePages = 10;
    } else if (this.screenWidth <= 1650) {
      this.countOfTitles = 6;
      this.maxSizePages = 5;
    }
  }

  // * change page
  @Output() BackFunc = new EventEmitter<string>();
  goBack(page: string) {
    this.BackFunc.emit(page);
    window.location.reload();
  }
}
