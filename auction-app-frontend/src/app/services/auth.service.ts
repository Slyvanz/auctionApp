import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {Router} from "@angular/router";
import {GET_ACTIVE_USER, SIGNIN_USER} from "../queries"
import {BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError} from "rxjs";

export interface User {
  username: string;
}

const TOKEN = "token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private
  private userSubject$ = new BehaviorSubject<User | null>(null);
  activeUser$: Observable<User | null> = this.userSubject$.asObservable();

  constructor(private apollo: Apollo, private router: Router) {

  };

  reloadAuth(): void {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      this.getActiveUser().subscribe();
    }
  }

  onLogout(): void {
    this.userSubject$.next(null);
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/']);
  };

  onLogin({username, password}: {
    username: string;
    password: string;
  }): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: SIGNIN_USER,
        variables: {
          username,
          password,
        }
      })
      .pipe(
        switchMap(({data, errors}: any) => {
          if (errors && errors.length > 0) {
            // console.log(throwError(errors));
            return throwError(errors);
          }
          localStorage.setItem(TOKEN, data.signIn.token);
          //??
          return this.getActiveUser();
        }),
        catchError(() => {
          console.log('throwError');
          return of(false);
        }),
      );
  }

  getActiveUser(): Observable<boolean> {
    return this.apollo
      .watchQuery({
        query: GET_ACTIVE_USER,
        fetchPolicy: 'cache-and-network'
      })
      .valueChanges.pipe(
        tap(({data}: any) => {
          this.userSubject$.next(data.activeUser);
        }),
        map(({data}: any) => Boolean(data.activeUser))
      );
  }

  //////////////////////////

  // onLogin({username, password}: {
  //   username: string;
  //   password: string;
  // }): Observable<User | null> {
  //   return this.apollo
  //     .mutate({
  //       mutation: SIGNIN_USER,
  //       variables: {
  //         username,
  //         password,
  //       }
  //     })
  //     .pipe(
  //       switchMap(({data}: any) => {
  //         localStorage.setItem('token', data.signIn.token);
  //         return this.getActiveUser();
  //       }),
  //       catchError(() => {
  //         console.log('throwError');
  //         return of(null);
  //       }),
  //     );
  // }

  // getActiveUser(): Observable<User | null> {
  //   return this.apollo
  //     .watchQuery({
  //       query: GET_ACTIVE_USER,
  //     })
  //     .valueChanges.pipe(
  //       tap(({data}: any) => {
  //         this.activeUser.next(data.activeUser);
  //       }),
  //       map(({data}: any) => data.activeUser)
  //     );
  // }
}
