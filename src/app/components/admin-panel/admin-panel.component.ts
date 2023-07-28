import { Component, ElementRef, OnInit } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user';
import { AddictionalService } from 'src/app/services/addictional.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  providers: [MessageService],
})
export class AdminPanelComponent implements OnInit {
  // * variables
  login: boolean = true;
  loggedUser!: User;

  // * constructor
  constructor(
    private el: ElementRef,
    private addService: AddictionalService,
    private messageService: MessageService
  ) {}

  // * ngOnInit
  ngOnInit(): void {
    this.addService.setHeader(false);
    const loggedUser = localStorage.getItem('chosenUser');
    if (loggedUser !== null) {
      this.loggedUser = JSON.parse(loggedUser);
    }
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

  // * logIn admin panel
  logIn() {
    if (this.loggedUser.role === 'admin') {
      const user = this.el.nativeElement.querySelector('.user');
      const pw1 = this.el.nativeElement.querySelector('.pw1');
      const pw2 = this.el.nativeElement.querySelector('.pw2');
      const hashPassword1 = SHA256(pw1.value).toString();
      const hashPassword2 = SHA256(pw2.value).toString();

      this.inputCheck(user);
      this.inputCheck(pw1);
      this.inputCheck(pw2);
      if (
        user.style.borderColor == 'red' ||
        pw1.style.borderColor == 'red' ||
        pw2.style.borderColor == 'red'
      ) {
        if (
          hashPassword1 == hashPassword2 &&
          hashPassword1 ===
            '55472909e621cb1459839fb3f3a80022daf6e44991c8c8d437a8dd112c447d37' &&
          user.value == 'admin'
        ) {
          this.login = true;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Wrong data typed',
          });
          user.style.borderColor = 'red';
          pw1.style.borderColor = 'red';
          pw2.style.borderColor = 'red';
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Wrong data typed',
        });
        user.style.borderColor = 'red';
        pw1.style.borderColor = 'red';
        pw2.style.borderColor = 'red';
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You have not access!',
      });
    }
  }
}
