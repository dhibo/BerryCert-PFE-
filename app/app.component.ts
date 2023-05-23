import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'application';
  auth : boolean = false ;
  drawer  !: MatDrawer 
  constructor( private authservice : AuthService ) { }

  isAuthenticated():boolean{
    return this.authservice.isLoggedIn()
  }
  handleMouseEnter(event: MouseEvent) {
    console.log("mouse enter")
    const x = event.clientX;
    const threshold = window.innerWidth; // halfway across the screen
  
    if ( threshold) {
      this.drawer.open();
    }
  }
  
  onMouseLeave(){
    console.log("mouse leave")
  }
}