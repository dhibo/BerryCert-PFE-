import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environements/env';
import { Organisation } from '../interfaces/organisation';
import { User } from '../interfaces/user';
import { Request } from '../interfaces/request';
import { Invitation } from '../interfaces/invitation';
@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  private baseUrl: string = `${environment.apiUrl}/api`;
  private orgUrl: string = `${this.baseUrl}/organisation/`;
  private requestsUrl: string = `${this.baseUrl}/request/`;
  private invitationsUrl: string = `${this.baseUrl}/invitation/`;
  
  constructor(private http: HttpClient) {}

  createOrganisation(data: any): Observable<any> {
    return this.http.post<any>(`${this.orgUrl}create/`, data ).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getOrganisation(): Observable<any> {
    return this.http.get<Organisation[]>(`${this.orgUrl}create/`, ).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.orgUrl}users/`).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  joinCompany(data: any): Observable<any> {
    const url = `${this.requestsUrl}create/`;
    return this.http.post<any>(url, data, ).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.requestsUrl}create/`, ).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  deleteRequest(id: any): Observable<any> {
    const url = `${this.requestsUrl}delete/${id}/`;
    return this.http.delete(url, ).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
 

  acceptRequest(id: any): Observable<any> {
    const url = `${this.requestsUrl}update/${id}/`;
    const data = { request_status: 'Accepted' };
    return this.http.put<any>(url, data, ).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  rejectRequest(id: any): Observable<any> {
    const url = `${this.requestsUrl}update/${id}/`;
    const data = { request_status: 'Rejected' };
    return this.http.put<any>(url, data, ).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getInvitations(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(`${this.invitationsUrl}create/` ).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  deleteInvitation(id: any): Observable<any> {
    const url = `${this.invitationsUrl}delete/${id}/`;
    return this.http.delete<any>(url, ).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  acceptInvitation(id : any ): Observable<any> {
    const data = { 'request_status' : 'Accepted'}
    const url = `${this.invitationsUrl}update/${id}/`
    return this.http.put<any>(url,data).pipe(
      catchError((error:any)=>{
        return throwError(error);
      })
    )
  }
 
  RejectedInvitation(id : any ): Observable<any> {
    const data = { 'request_status' : 'Rejected'}
    const url = `${this.invitationsUrl}update/${id}/`
    return this.http.put<any>(url,data).pipe(
      catchError((error:any)=>{
        return throwError(error);
      })
    )
  }
  sendinvitation(form : any ): Observable<any> {
    return this.http.post<any>(`${this.invitationsUrl}create/`,form).pipe(
      catchError((error:any)=>{
        return throwError(error);
      })
    )
  }}