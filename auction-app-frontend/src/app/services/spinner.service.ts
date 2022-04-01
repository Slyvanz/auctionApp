import {Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, finalize, Observable, of, tap} from "rxjs";

@Injectable()
export class SpinnerService {


  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> | any = this.loadingSubject.asObservable();

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }

  // showLoaderCompleted<T>(obs$: Observable<T>): Observable<T> | any {
  //   return of(null)
  //     .pipe(tap(() => this.loadingOn()),
  //       concatMap(() => obs$),
  //       finalize(() => this.loadingOff())
  //     )
  // }

}
