import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { SHA256 } from 'crypto-js';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [MessageService],
})
export class RegistrationComponent implements OnInit {
  // * variables
  photo!: string;
  new_user: User = new User();
  users: User[] = [];

  // * constructor
  constructor(
    private el: ElementRef,
    private messageService: MessageService,
    private service: UserService
  ) {}

  // * ngOnInit
  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // * go back
  @Output() BackFunc = new EventEmitter<string>();
  goBack(page: string) {
    this.BackFunc.emit(page);
  }

  // * get file and parse it to url
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const url = e.target.result;
      sessionStorage.setItem('profileImage', url);
      this.photo = url;
    };
    reader.readAsDataURL(file);
  }

  // * verify input field
  inputCheck(obj: HTMLInputElement) {
    if (obj.value == '') {
      obj.style.borderColor = 'red';
    }
  }

  // * backup input field
  inputBackUp(className: string) {
    if (
      this.el.nativeElement.querySelector(`.${className}`).style.borderColor ==
      'red'
    ) {
      this.el.nativeElement.querySelector(`.${className}`).style.borderColor =
        '#404040';
    }
  }

  // * create user
  createUser() {
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
        this.new_user.id = this.users[this.users.length - 1].id + 1;
        this.new_user.name = name.value;
        this.new_user.email = email.value;
        this.new_user.password = hashPassword1;
        this.new_user.status = 'logged';
        this.new_user.photo = this.photo;
        this.service.createUser(this.new_user).subscribe((data) => {});
        this.service.setLogUser(this.new_user);
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
