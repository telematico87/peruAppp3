import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {

            // Logout automatically if error 401 returned from api
            if (error.status === 401) {
                this.authenticationService.logout();
                location.reload();
            }

            // Set better errorResponse
            let errorResponse = {
              error,
              // message: error.error.message ? error.error.message : '',
              message: '',
              data: '',
              status: error.status,
              name: error.name,
              url: error.url
          };

            // const errorResponse = error.error.message || error.statusText;

          return throwError(errorResponse);

        }));
    }
}
