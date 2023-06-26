import { Component, OnInit } from '@angular/core';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  password = 'qwerty12345';
  constructor() {}

  ngOnInit(): void {
    const hash = SHA256(this.password).toString();
    console.log(hash);
  }
}
