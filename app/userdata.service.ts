import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environements/env';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private userData = new BehaviorSubject<any>(null);
  private baseUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { 
    this.loadUserData();
  }

  loadUserData() {
    this.http.get(`${this.baseUrl}/api/users/`).subscribe(data => {
      this.userData.next(data);
    });
  }

  getSharedUserData() {
    return this.userData.asObservable();
  }
}
