import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// import { LocalStorageService} from 'angular-web-storage';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  // AUTH DATA
  private authorization: any = '';
  private idToken: any = '';

  // ENDPOINTS
  private backendApi = environment.backendApi;

  constructor(
    // public local: LocalStorageService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return of(null).pipe(mergeMap(() => {

      // LOG
      // console.log('Backend Interceptor...');

      // GET TOKEN
      // console.log(localStorage.getItem('token'));
      const token = localStorage.getItem('token');
      this.authorization = token !== null ? token : '';

      // USER AUTH ASSIGN
      // if (user) {
      //   // console.log(user.getIdToken());
      //   this.idToken = user.getIdToken();
      //   // console.log(this.idToken);
      //   this.authorization = this.idToken.getJwtToken();
      //   // console.log(this.authorization);
      // }

      // ALL REQUEST NEED AUTHORIZATION
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authorization,
        },
      });

      // CHECK IF ENDPOINT NEED
      const baseApi = this.backendApi;

      const backendRequest = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authorization
        },
        url: baseApi + request.url
      });
      return next.handle(backendRequest);
    }));

  }

}
