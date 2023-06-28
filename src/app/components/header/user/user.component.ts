import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  clickEventSubscription!: Subscription;
  page = 'user';
  user = 'none';
  loggedUser: User = new User();
  constructor(private service: UserService) {
    this.clickEventSubscription = this.service
      .getLogUser()
      .subscribe((data: User) => {
        localStorage.setItem('chosenUser', JSON.stringify(data));
        this.loggedUser = data;
        if (this.loggedUser.status == 'logged') {
          this.changeUser('logged_user');
        }
      });
  }

  ngOnInit(): void {
    const loggedUser = localStorage.getItem('chosenUser');
    if (loggedUser !== null) {
      this.loggedUser = JSON.parse(loggedUser);
      if (this.loggedUser.status == 'logged') {
        this.changeUser('logged_user');
      }
    }
  }

  changePage(page: string) {
    this.page = page;
  }
  changeUser(user: string) {
    this.user = user;
  }
  LogOut() {
    this.user = 'none';
    this.loggedUser.status = 'unlogged';
    this.service.updateUser(this.loggedUser).subscribe((data) => {});
    localStorage.setItem('chosenUser', JSON.stringify(this.loggedUser));
    this.service.setLogUser(this.loggedUser);
  }
}
