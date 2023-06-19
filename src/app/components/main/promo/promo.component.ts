import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
})
export class PromoComponent implements OnInit {
  // init variables

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  // init functions

  ClickOnSearch() {
    const search = (<HTMLElement>this.el.nativeElement).querySelector(
      '.pi-search'
    );
    search!.classList.add('bounce');
    setTimeout(function () {
      search!.classList.remove('bounce');
    }, 200);
  }
}
