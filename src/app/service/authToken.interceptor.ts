import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, exhaustMap, tap, throwError } from 'rxjs';
import { AppState } from '../shared/app.state';
import { getToken } from '../shared/store/login/login.selector';
import { MasterService } from './master.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>, private service: MasterService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const BASE_URL = 'http://localhost:1000/api/v1/';

    let apiRequest = req.clone({
      url: BASE_URL + req.url,
    });

    let accToken = this.service.getTokenFromLocalStorage();

    if (accToken) {
      apiRequest = apiRequest.clone({
        setHeaders: {
          authorization: `Bearer ${accToken}`,
        },
      });
    }
    return next.handle(apiRequest).pipe(
      tap(
        (event) => {
          if (event.type === HttpEventType.Response && event.status === 200) {
            const { token, refreshToken, user } = event.body;

            if (token) {
              this.service.setTokenInLocalStorage(token);
              apiRequest.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
            }
            if (refreshToken) {
              this.service.setRefreshToken(refreshToken);
            }
          }
        },
        catchError((error) => {
          if (error.status === 403) {
            console.log('Unauthorized error');

            this.service.refreshToken();
          }
          return throwError(error);
        })
      )
    );
  }
}
