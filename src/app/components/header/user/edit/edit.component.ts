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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [MessageService],
})
export class EditComponent implements OnInit {
  photo!: string;
  loggedUser: User = new User();

  constructor(
    private service: UserService,
    private el: ElementRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const loggedUser = localStorage.getItem('chosenUser');
    if (loggedUser !== null) {
      this.loggedUser = JSON.parse(loggedUser);
    }
  }

  @Output() BackFunc = new EventEmitter<string>();
  goBack(page: string) {
    this.BackFunc.emit(page);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const url = e.target.result;
      sessionStorage.setItem('profileImage', url);
      this.photo = url;
      this.loggedUser.photo = this.photo;
    };
    reader.readAsDataURL(file);
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

  updateUser() {
    const name = this.el.nativeElement.querySelector('.name');
    const email = this.el.nativeElement.querySelector('.email');
    const password1 = this.el.nativeElement.querySelector('.password1');
    const password2 = this.el.nativeElement.querySelector('.password2');
    const hashPassword1 = SHA256(password1.value).toString();
    const hashPassword2 = SHA256(password2.value).toString();

    if (hashPassword1 == hashPassword2) {
      this.inputCheck(name);
      this.inputCheck(email);
      this.inputCheck(password1);
      this.inputCheck(password2);
      if (
        name.style.borderColor == 'red' ||
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
        this.loggedUser.name = name.value;
        this.loggedUser.email = email.value;
        this.loggedUser.password = hashPassword1;
        this.loggedUser.photo = this.photo;
        this.service.updateUser(this.loggedUser).subscribe((data) => {});
        this.service.setLogUser(this.loggedUser);
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
