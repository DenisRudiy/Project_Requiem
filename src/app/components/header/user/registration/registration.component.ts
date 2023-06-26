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
  photo =
    'data:image/png;base64,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';

  new_user: User = new User();
  users: User[] = [];
  constructor(
    private el: ElementRef,
    private messageService: MessageService,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.service.getUser().subscribe((data) => {
      this.users = data;
    });
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
      console.log(this.photo);
    };
    reader.readAsDataURL(file);
  }

  inputCheck(obj: HTMLInputElement) {
    if (obj.value == '') {
      obj.style.borderColor = 'red';
    }
  }

  inputBackUp(className: string) {
    this.el.nativeElement.querySelector(`.${className}`).style.borderColor =
      '#404040';
  }

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
        console.log(
          name.value,
          email.value,
          hashPassword1,
          hashPassword2,
          this.photo
        );
        this.new_user.id = this.users[this.users.length - 1].id + 1;
        this.new_user.name = name.value;
        this.new_user.email = email.value;
        this.new_user.photo = this.photo;
        this.new_user.password = password1.value;
        this.service.createUser(this.new_user).subscribe((data) => {});
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
