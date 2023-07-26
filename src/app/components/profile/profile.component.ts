import { Component, OnInit } from '@angular/core';
import { AddictionalService } from 'src/app/services/addictional.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private addService: AddictionalService) {}

  ngOnInit(): void {
    window.scrollTo(-1000, 0);
    this.addService.setHeader(true);
  }
}
