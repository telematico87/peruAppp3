import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from './cookie.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    user: any;
    token: any;

    constructor(
      private http: HttpClient, private cookieService: CookieService
      ) {

    }

    /**
     * Returns the current user from cookie
     */
    public currentUser() {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('currentUser'));
        }
        return this.user;
    }

    validateKey(key: string){
      return this.http.post<any>('auth/validate-key', { key });
    }

    /**
     * Function that check if tocken exist and return true
     * else false
     */
    isLoggedIn() {
      this.token = localStorage.getItem('token');
      return this.token !== null ? true : false;
    }

    /**
     * Login 
     *
     * @param email uer email
     * @param password user password
     */
    login(email: string, password: string) {
      return this.http.post<any>('api/auth/login', { email, password })
          .pipe(
            map(response => {
              // Save token in Local Storage
              localStorage.setItem('token', response.token);

              this.token = response.token;
          
              return response;
            })
          );
    }

    /**
     * Logout the user
     * and remove variables from local storage for safety
     */
    logout() {
        // remove user from local storage to log user out
        // this.cookieService.deleteCookie('currentUser');
        this.token = null;
        localStorage.removeItem('token');
    }
}

