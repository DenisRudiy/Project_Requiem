import { Component, OnInit } from '@angular/core';
import { AddictionalService } from 'src/app/services/addictional.service';

@Component({
  selector: 'app-all-mangas',
  templateUrl: './all-mangas.component.html',
  styleUrls: ['./all-mangas.component.scss'],
})
export class AllMangasComponent implements OnInit {
  constructor(private addService: AddictionalService) {}

  ngOnInit(): void {
    this.addService.setHeader(true);
  }
}
