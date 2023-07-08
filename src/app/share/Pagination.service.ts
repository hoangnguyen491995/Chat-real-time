import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PaginationService {
  private currentPageSubject: BehaviorSubject<number>;
  private currentSizeSubject: BehaviorSubject<number>;
  public totalCountSubject: BehaviorSubject<number>;
  private currentOffsetSubject: BehaviorSubject<number>;

  currentPage$: Observable<number>;
  currentSize$: Observable<number>;
  totalCount$: Observable<number>;
  currentOffset$: Observable<number>;

  constructor() {
    this.currentPageSubject = new BehaviorSubject<number>(1);
    this.currentSizeSubject = new BehaviorSubject<number>(10);
    this.totalCountSubject = new BehaviorSubject<number>(0);
    this.currentOffsetSubject = new BehaviorSubject<number>(0);

    this.currentPage$ = this.currentPageSubject.asObservable();
    this.currentSize$ = this.currentSizeSubject.asObservable();
    this.totalCount$ = this.totalCountSubject.asObservable();
    this.currentOffset$ = this.currentOffsetSubject.asObservable();
  }

  updateSize(newSize: number) {
    this.currentSizeSubject.next(newSize);
  }

  updatePage(newPage: number) {
    this.currentPageSubject.next(newPage);
  }

  updateTotalCount(newTotalCount: number) {
    this.totalCountSubject.next(newTotalCount);
  }

  updateCurrentOffset(newOffset: number) {
    this.currentOffsetSubject.next(newOffset);
  }
}
