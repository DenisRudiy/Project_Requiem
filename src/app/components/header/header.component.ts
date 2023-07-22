import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import disableScroll from 'disable-scroll';
import { Subscription } from 'rxjs';
import { AddictionalService } from 'src/app/services/addictional.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // * variables
  clickEventSubscription!: Subscription;
  public screenWidth: any;
  sidebarVisible = false;
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  // * constructor
  constructor(
    private el: ElementRef,
    private service: UserService,
    private addService: AddictionalService
  ) {
    this.clickEventSubscription = this.service.getClickEvent().subscribe(() => {
      this.ExitHeader('open');
    });
  }

  // * ngOnInit
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

  // * show header
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

  // * hide header
  ExitHeader(open: string) {
    if (this.screenWidth <= 1500) {
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
      }, 200);
    }
    if (open === 'open') {
      this.sidebarVisible = true;
    }
  }

  // * hide header by overlay clicked
  ClickOnOverlay() {
    this.ExitHeader('');
  }

  // * hide/show header by window size
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    const header = (<HTMLElement>this.el.nativeElement).querySelector(
      '.header'
    );
    const overlay = (<HTMLElement>this.el.nativeElement).querySelector(
      '.overlay'
    );
    const exitBtn = (<HTMLElement>this.el.nativeElement).querySelector(
      '.exitBtn'
    );
    if (this.screenWidth <= 1500) {
      header!.classList.remove('header-show');
      header!.classList.add('hidden');
      overlay!.classList.remove('show');
      overlay!.classList.add('hidden');
      exitBtn!.classList.remove('hidden');
      exitBtn!.classList.add('show');
    } else if (this.screenWidth > 1500) {
      header!.classList.remove('hidden');
      header!.classList.add('header-show');
      overlay!.classList.remove('show');
      overlay!.classList.add('hidden');
      exitBtn!.classList.remove('show');
      exitBtn!.classList.add('hidden');
      disableScroll.off();
    }
  }
}
