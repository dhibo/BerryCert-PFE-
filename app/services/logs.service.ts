import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environements/env';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private readonly baseurl = environment.logsurl + '/api';

  constructor(private http: HttpClient) { }


  getdocument(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/createDoc/`).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getmylogs(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/create/`).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getorglogs(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/createorg/`).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

}
  
