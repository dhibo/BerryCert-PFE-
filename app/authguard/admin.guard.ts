import { OrganisationService } from 'src/app/services/organisation.service';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  currentUser : any 
  organization : any 

  constructor ( private AuthService : AuthService , private Router : Router ){}
    canActivate(){
        if (this.AuthService.isAdmin()){
          return true ; 
        }
        this.Router.navigate(['organisation'])
        return false;
      }
    }