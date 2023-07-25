import { Component, OnInit } from '@angular/core';
import { AddictionalService } from 'src/app/services/addictional.service';

@Component({
  selector: 'app-current-manga',
  templateUrl: './current-manga.component.html',
  styleUrls: ['./current-manga.component.scss'],
})
export class CurrentMangaComponent implements OnInit {
  constructor(private addService: AddictionalService) {}

  ngOnInit(): void {
    this.addService.setHeader(true);
  }
}
