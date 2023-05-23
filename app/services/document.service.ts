import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environements/env';
import { Document } from '../interfaces/document';
import { Request } from '../interfaces/request';
import { SignRequest } from '../interfaces/sign-request';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private baseUrl: string = environment.documentUrl;
  private signUrl: string = environment.signUrl;
  constructor(private http: HttpClient) { }

  update(data: any, id: any): Observable<any> {
    const url = `${this.baseUrl}/documents/doc/${id}/`;
    return this.http.put<any>(url, data).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  add(data: any): Observable<any> {
    const url = `${this.baseUrl}/documents/doc/`;
    return this.http.post<any>(url, data).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  get(): Observable<Document[]> {
    const url = `${this.baseUrl}/documents/doc/`;
    return this.http.get<Document[]>(url).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  delete(id: any): Observable<any> {
    const url = `${this.baseUrl}/documents/doc/${id}/`;
    return this.http.delete<any>(url).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  requestdelete(id: any): Observable<any> {
    const url = `${this.baseUrl}/documents/requestdelete/${id}/`;
    return this.http.delete<any>(url).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getrequests(): Observable<SignRequest[]> {
    const url = `${this.baseUrl}/documents/requests/`;
    return this.http.get<SignRequest[]>(url).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  addrequest(data: any): Observable<any> {
    const url = `${this.baseUrl}/documents/requests/`;
    return this.http.post<any>(url, data).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  getcert(id:any){
    const url = `${this.signUrl}/api/getCert/${id}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  acceptrequest(id:any){
    const url = `${this.baseUrl}/documents/requestupdate/${id}/`;
    const data =  { request_status : 'Accepted'}
    return this.http.put<any>(url,data).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  rejectrequest(id:any){
    const url = `${this.baseUrl}/documents/requestupdate/${id}/`;
    const data =  { request_status : 'Rejected'}
    return this.http.put<any>(url,data).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  download(id: any) {
    const url = `${this.baseUrl}/documents/doc/${id}/download/`;
    return this.http.get(url, {responseType: 'blob'})
  }
}
