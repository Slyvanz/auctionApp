import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {Router} from "@angular/router";
import {CREATE_USER, GET_ACTIVE_USER, SIGNIN_USER} from "../queries"
import {BehaviorSubject, catchError, Observable, of, switchMap, throwError} from "rxjs";
import {take} from "rxjs/operators";

export interface User {
  username: string;
}

const TOKEN = "token";
const LOGIN_ERROR_MESSAGE = "Oturum açılamadı.";
const GET_ACTIVE_USER_ERROR_MESSAGE = "Kimliğiniz doğrulanamadı.";
const REGISTER_ERROR_MESSAGE = "Kayıdınız tamamlanamadı.";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _activeUser$ = new BehaviorSubject<User | null>(null);
  public activeUser$: Observable<User | null> = this._activeUser$.asObservable();

  constructor(private apollo: Apollo, private router: Router) {
  }

  checkTokenThenFetchUser(): Observable<boolean> {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      return this.getActiveUser();
    }

    return of(false);
  }

  logout(): void {
    this._activeUser$.next(null);
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/']);
  };

  login({username, password}: {
    username: string;
    password: string;
  }): Observable<boolean> {
    return this.apollo
      .mutate<{
        signIn: {
          token: string
        }
      }>({
        mutation: SIGNIN_USER,
        variables: {
          username,
          password,
        }
      })
      .pipe(
        take(1),
        switchMap(({data, errors}) => {
          if (errors && errors.length > 0) {
            return throwError(errors.map((error) => error.message).join(', '));
          }

          if (!(data && data.signIn && data.signIn.token)) {
            return throwError(LOGIN_ERROR_MESSAGE);
          }

          localStorage.setItem(TOKEN, data.signIn.token);

          return this.getActiveUser();
        }),
      );
  }

  register({username, password}: {
    username: string;
    password: string;
  }): Observable<boolean> {
    return this.apollo
      .mutate<{
        createUser: {
          token: string
        }
      }>({
        mutation: CREATE_USER,
        variables: {
          username,
          password,
        }
      })
      .pipe(
        take(1),
        switchMap(({data, errors}) => {
          if (errors && errors.length > 0) {
            return throwError(errors.map((error) => error.message).join(', '));
          }

          if (!(data && data.createUser && data.createUser.token)) {
            return throwError(REGISTER_ERROR_MESSAGE);
          }

          localStorage.setItem(TOKEN, data.createUser.token);

          return this.getActiveUser();
        }),
      );
  }

  getActiveUser(): Observable<boolean> {
    return this.apollo
      .watchQuery<{
        activeUser: User
      }>({
        query: GET_ACTIVE_USER
      })
      .valueChanges.pipe(
        take(1),
        switchMap(({data, errors}) => {
          if (errors && errors.length > 0) {
            return throwError(errors.map((error) => error.message).join(', '));
          }
          if (!(data && data.activeUser && data.activeUser.username)) {
            return throwError(GET_ACTIVE_USER_ERROR_MESSAGE);
          }

          this._activeUser$.next(data.activeUser);

          return of(true);
        }),
        catchError(() => {
          localStorage.removeItem(TOKEN);
          return of(false);
        })
      );
  }
}
