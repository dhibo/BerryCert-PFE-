import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserdataService } from 'src/app/userdata.service';
import { AdminInterfaceComponent } from '../organisations/admin-interface/admin-interface.component';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  organisation: any;
  currentuser: any;
  editMode : any;
  isCurrentUser : any 
  constructor( private authService: AuthService,private shared : UserdataService, private route: ActivatedRoute) {}
  async ngOnInit() {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      this.user = await this.authService.getUser(id).toPromise()
      this.currentuser = await this.authService.getMe().toPromise();
      this.isCurrentUser = this.currentuser[0].email === this.user.email;
    } catch (error) {
      console.error(error);
    }
  }
  

  async updateProfile() {
    const fromdata = new FormData();
    fromdata.append('last_name',this.user.last_name)
    fromdata.append('first_name',this.user.first_name)
    console.log(fromdata)
    this.authService.updateUser(fromdata).subscribe()
    window.location.reload();
    this.editMode = false;
  }
}
