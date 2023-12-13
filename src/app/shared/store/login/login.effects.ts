import { Injectable, OnInit } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MasterService } from '../../../service/master.service';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess,
  registerUser,
  registerUserSuccess,
  
} from './login.action';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { setErrorMessage, setLoadingSpinner } from '../../shared.action';
import { Router } from '@angular/router';
import { User } from '../../../model/userModel';

@Injectable()
export class LoginEffects {
  constructor(
    private action$: Actions,
    private service: MasterService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.service.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const { user, token } = data;
            this.service.setTokenInLocalStorage(token);
            this.service.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.service.getErrorMessage(errResp);
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginedirect$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            const user = action.user;
            if (user?.role === 'ADMIN') {
              this.router.navigate(['admin-home']);
            } else {
              this.router.navigate(['home']);
            }
          }
        })
      );
    },
    { dispatch: false }
  );

  signupdirect$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(registerUserSuccess),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );

  signup$ = createEffect(() => {
    return this.action$.pipe(
      ofType(registerUser),
      exhaustMap((action) => {
        return this.service.registerUser(action.registerInput).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            // const { user } = data;
            return registerUserSuccess(data);
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.service.getErrorMessage(errResp);
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.action$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        let user: User | null;
        const usertest = this.service.getUser();
        const userJson = JSON.stringify(usertest);
        user = JSON.parse(userJson) as User;

        return of(loginSuccess({ user, redirect:false}));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.service.logout();
          this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );
}
