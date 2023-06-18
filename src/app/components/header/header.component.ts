import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import disableScroll from 'disable-scroll';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public screenWidth: any;
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  constructor(private el: ElementRef) {}

  OpenHeader() {
    disableScroll.on();
    const header = (<HTMLElement>this.el.nativeElement).querySelector(
      '.header'
    );
    const overlay = (<HTMLElement>this.el.nativeElement).querySelector(
      '.overlay'
    );
    const exitBtn = (<HTMLElement>this.el.nativeElement).querySelector(
      '.exitBtn'
    );
    header!.classList.remove('hidden');
    exitBtn!.classList.remove('hidden');
    overlay!.classList.remove('hidden');
    header!.classList.add('header-show');
    overlay!.classList.add('show');
    exitBtn!.classList.add('show');
  }

  ExitHeader() {
    disableScroll.off();
    const header = (<HTMLElement>this.el.nativeElement).querySelector(
      '.header'
    );
    const overlay = (<HTMLElement>this.el.nativeElement).querySelector(
      '.overlay'
    );
    const exitBtn = (<HTMLElement>this.el.nativeElement).querySelector(
      '.exitBtn'
    );
    header!.classList.remove('header-show');
    exitBtn!.classList.remove('show');
    overlay!.classList.remove('show');
    header!.classList.add('header-hidden');
    overlay!.classList.add('hidden');
    exitBtn!.classList.add('hidden');
    setTimeout(function () {
      header!.classList.remove('header-hidden');
      header!.classList.add('hidden');
    }, 400);
  }

  ngOnInit(): void {
    const header = (<HTMLElement>this.el.nativeElement).querySelector(
      '.header'
    );
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 1500) {
      header!.classList.remove('header-show');
      header!.classList.add('hidden');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    const header = (<HTMLElement>this.el.nativeElement).querySelector(
      '.header'
    );
    const overlay = (<HTMLElement>this.el.nativeElement).querySelector(
      '.overlay'
    );
    if (this.screenWidth <= 1500) {
      header!.classList.remove('header-show');
      header!.classList.add('hidden');
      overlay!.classList.remove('show');
      overlay!.classList.add('hidden');
    } else if (this.screenWidth > 1500) {
      header!.classList.remove('hidden');
      header!.classList.add('header-show');
      overlay!.classList.remove('show');
      overlay!.classList.add('hidden');
    }
  }
}
