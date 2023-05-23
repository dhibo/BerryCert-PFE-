import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private auth : AuthService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = this.auth.getToken();
    if (authToken) {
      console.log(authToken)
      request = this.addToken(request, authToken);
    }
    return next.handle(request).pipe(
      catchError((error) => {
        // lahne besh itechki kan el request rajatlou unauthorised manehtha el token expiret ! 
        if (error.status === 401) {
          // lahne yemshii yemshi yamel mo7awel emt3 irefresh token 
          return this.auth.refreshToken().pipe(
            switchMap((newToken) => {
              console.log(newToken)
              // Retry the request with the new access token
              request = this.addToken(request, newToken.access);
              return next.handle(request);
            }),
            catchError((refreshError) => {
              // If refreshing the token fails, log the user out
              this.auth.logout();
              return throwError(refreshError);
            })
          );
        }
        // For other errors, re-throw the error
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
      
    }
    );
  }
}
