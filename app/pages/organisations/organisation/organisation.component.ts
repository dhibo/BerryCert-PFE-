import { UserdataService } from './../../../userdata.service';
import { UserRequestsComponent } from '../user-requests/user-requests.component';
import { InvitationsComponent } from '../invitations/invitations.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { AddOrganisationComponent } from '../add-organisation/add-organisation.component';
import { CreateOrganisationComponent } from '../create-organisation/create-organisation.component';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent  {
  hasOrganization: any ;
  organisation : any ;
  users :any 
  userinfo : any 
  constructor(private dialog : MatDialog ,private UserdataService : UserdataService ,private AuthService:AuthService, private OrganisationService : OrganisationService ){}
  async ngOnInit() {
    try {
      const response = await this.OrganisationService.getOrganisation().toPromise();
      this.organisation = response[0]
      if (this.organisation) {
        this.hasOrganization = true;
        this.OrganisationService.getUsers().subscribe(response => {this.users = response })
      } else {
        this.hasOrganization = false;
      }
    } catch (error) {
      
    }
  }
  
  invitation(){
    const dialogRef = this.dialog.open(InvitationsComponent, {
      width: '600px',
      data :{
        admin : false 
      }
     
    });
    
  }
  requests(){
    const dialogRef = this.dialog.open(UserRequestsComponent, {
      width: '600px',
      data : { 
        admin : false 

      }
     
    });
    
  }
  joinCompany(){
    const dialogRef = this.dialog.open(AddOrganisationComponent, {
    width: '500px',
   
  });
  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit()    
  });}
  createCompany(){

    const dialogRef = this.dialog.open(CreateOrganisationComponent, {
      width: '500px',
     
    });

    dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit()
      });
  }
   isAdminDisabled() {
    this.UserdataService.getSharedUserData().subscribe(Response => { this.userinfo = Response})
    
    if (this.userinfo && this.userinfo.length > 0 && this.userinfo[0].email === this.organisation.owner) {
      return false;
    } else {
      return true;
    }
  }
  
  

}

