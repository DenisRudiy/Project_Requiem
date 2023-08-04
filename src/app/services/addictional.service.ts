import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddictionalService {
  private isOpenHeader = new Subject<boolean>();
  private subject = new Subject<any>();

  constructor() {
    const isOpenHeader = localStorage.getItem('openHeader');
    if (isOpenHeader) {
      const isOpen = JSON.parse(isOpenHeader);
      this.isOpenHeader.next(isOpen);
    }
  }

  // * get/set functions
  setHeader(isOpen: boolean) {
    this.isOpenHeader.next(isOpen);
    localStorage.setItem('openHeader', JSON.stringify(isOpen));
  }

  getHeader(): Observable<boolean> {
    return this.isOpenHeader.asObservable();
  }

  setCloseHeader() {
    this.subject.next(1);
  }

  getCloseHeader(): Observable<any> {
    return this.subject.asObservable();
  }
}
