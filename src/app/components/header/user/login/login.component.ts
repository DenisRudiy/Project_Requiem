import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { SHA256 } from 'crypto-js';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  users: User[] = [];

  constructor(
    private el: ElementRef,
    private messageService: MessageService,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  inputCheck(obj: HTMLInputElement) {
    if (obj.value == '') {
      obj.style.borderColor = 'red';
    }
  }

  inputBackUp(className: string) {
    if (
      this.el.nativeElement.querySelector(`.${className}`).style.borderColor ==
      'red'
    ) {
      this.el.nativeElement.querySelector(`.${className}`).style.borderColor =
        '#404040';
    }
  }

  // @Output() logUser = new EventEmitter<User>();
  @Output() BackFunc = new EventEmitter<string>();
  goBack(page: string) {
    this.BackFunc.emit(page);
  }

  LogIn() {
    const email = this.el.nativeElement.querySelector('.email');
    const password1 = this.el.nativeElement.querySelector('.password1');
    const password2 = this.el.nativeElement.querySelector('.password2');
    const hashPassword1 = SHA256(password1.value).toString();
    const hashPassword2 = SHA256(password2.value).toString();

    if (hashPassword1 == hashPassword2) {
      this.inputCheck(email);
      this.inputCheck(password1);
      this.inputCheck(password2);
      if (
        email.style.borderColor == 'red' ||
        password1.style.borderColor == 'red' ||
        password2.style.borderColor == 'red'
      ) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Type data in all fields!',
        });
      } else {
        for (let i = 0; i < this.users.length; i++) {
          if (
            hashPassword1 == this.users[i].password &&
            email.value == this.users[i].email
          ) {
            this.service.setLogUser(this.users[i]);
          }
        }
        this.goBack('user');
      }
    } else {
      password1.style.borderColor = 'red';
      password2.style.borderColor = 'red';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Repeat password correctly!',
      });
    }
  }
}
