import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SpinnerService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this._isLoading$.asObservable();

  loadingOn() {
    this._isLoading$.next(true);
  }

  loadingOff() {
    this._isLoading$.next(false);
  }
}
