import { OrganisationService } from 'src/app/services/organisation.service';
import { HttpClientModule ,HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, combineLatest, map, of, throwError } from 'rxjs';
import { environment } from 'src/environements/env';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseurl = environment.apiUrl + '/api/';
  private readonly refreshUrl = environment.apiUrl + '/api/token/refresh/';
  private readonly TOKEN_KEY = 'myapp_token';
  private readonly REFRESH_KEY = 'refresh_token';
  private currentUser : any ;
  private organization : any ;

  constructor(private http: HttpClient, private cookieService: CookieService , private OrganisationService : OrganisationService) {}

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    const data = { 'refresh': refreshToken };
    return this.http.post<any>(this.refreshUrl, data).pipe(
      map((response) => {
        this.setAccessToken(response.access);
        return response;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  logout(): Observable<any> {
    this.cookieService.delete(this.TOKEN_KEY);
    this.cookieService.delete(this.REFRESH_KEY);
    localStorage.removeItem(this.REFRESH_KEY)
    localStorage.removeItem(this.TOKEN_KEY)

    return this.http.post(`${this.baseurl}logout/`, {}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getToken(): string {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  setAccessToken(token: string): void {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (60 * 60 * 1000));
    this.cookieService.set(this.TOKEN_KEY, token, expirationDate, '/', '', true, 'Strict');
    localStorage.setItem(this.TOKEN_KEY,token)
  }

  getRefreshToken() {
    //return this.cookieService.get(this.REFRESH_KEY);
    return localStorage.getItem(this.REFRESH_KEY)
  }

  setRefreshToken(token: string): void {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (30 * 24 * 60 * 60 * 1000));
    this.cookieService.set(this.REFRESH_KEY, token, expirationDate, '/', '', true, 'Strict');
    localStorage.setItem(this.REFRESH_KEY,token)

  }

  deleteToken() {
    this.cookieService.delete(this.TOKEN_KEY);
    this.cookieService.delete(this.REFRESH_KEY);
  }

  getMe(): Observable<User[]> {
    return this.http.get<any>(`${this.baseurl}users/`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getUser(id: any): Observable<any> {
    const url = `${this.baseurl}users/${id}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updateUser(data: any): Observable<any> {
    const url = `${this.baseurl}update/`;
    return this.http.put<any>(url, data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  signup(userObj: any): Observable<any> {
    const url = `${this.baseurl}users/`;
    return this.http.post<any>(url, userObj).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  loginfn(loginObj: any): Observable<any> {
    const url = `${this.baseurl}login/`;
    return this.http.post<any>(url, loginObj).pipe(
      map((response) => {
        console.log(response.access)
        this.setAccessToken(response.access);
        console.log()
        console.log("pass")
        this.setRefreshToken(response.refresh);
        return response;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  isLoggedIn(): boolean {
    //return !!this.cookieService.get(this.TOKEN_KEY);
    return !!localStorage.getItem(this.TOKEN_KEY)
  }
  isAdmin(): Observable<boolean> {
    return combineLatest([
      this.getMe(),
      this.OrganisationService.getOrganisation()
    ]).pipe(
      map(([currentUser, organization]) => {
        return currentUser[0].email === organization.owner;
      })
    );
  }
}