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
  countOfTitles = 12;
  dialog: boolean = false;
  allFavPages: string[] = [];
  currPage: string = '';

  // * constructor
  constructor(private service: UserService) {}

  // * ngOnInit
  ngOnInit(): void {
    const loggedUser = localStorage.getItem('chosenUser');
    if (loggedUser !== null) {
      this.loggedUser = JSON.parse(loggedUser);
      this.allFavPages = this.loggedUser.favorite;
      console.log(this.allFavPages);
    }
  }
  // * show more titles
  showMore() {
    this.countOfTitles += 12;
  }

  // * change page
  @Output() BackFunc = new EventEmitter<string>();
  goBack(page: string) {
    this.BackFunc.emit(page);
  }

  openDialog(page: string) {
    this.currPage = page;
    this.dialog = true;
  }
}
