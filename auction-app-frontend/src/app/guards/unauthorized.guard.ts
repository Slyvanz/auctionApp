import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  public canActivate(): Observable<boolean> {
    return this.authService.activeUser$.pipe(
      map((user) => {
        if (user) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      })
    );
  }
}
