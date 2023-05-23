import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InvitationsComponent } from '../invitations/invitations.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { UserRequestsComponent } from '../user-requests/user-requests.component';
import { SendInvitationComponent } from '../send-invitation/send-invitation.component';
import { OrganisationService } from 'src/app/services/organisation.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent {
  totaldocuments: number = 0;
  totalrequests: number = 0;
  totalinvitaitons: number = 0;
  totalmembres: number = 0;
  mydocuments : any
  logs : any
  myrequests : any 
  myinvitations : any 
  constructor(private OrganisationService : OrganisationService , private documentservice : DocumentService ,private dialog : MatDialog ){}
  
  
  users : any ; 
  ngOnInit(){
    this.OrganisationService.getUsers().subscribe(response => {
    this.users = response;
    console.log(response);
    this.totalmembres = this.users.length;
    });
    this.OrganisationService.getRequests().subscribe(response => {
      this.myrequests = response;
      this.totalrequests = this.myrequests.length;
  });
  
  this.OrganisationService.getInvitations().subscribe(response => {
      this.myinvitations = response;
      this.totalinvitaitons = this.myinvitations.length;
  });
  
  this.documentservice.get().subscribe(response => {
      this.mydocuments = response;
      this.totaldocuments = this.mydocuments.length;
  });
}  
  invitation(){
   

    const dialogRef = this.dialog.open(InvitationsComponent, {
      width: '600px',
      data :{ admin : true }
    });
   

  }
    requests(){
      const dialogRef = this.dialog.open(UserRequestsComponent, {
        width: '600px',
        data :{ admin : true }

        
      });  
  }
  sendinvitation(){
    const dialogRef = this.dialog.open(SendInvitationComponent, {
      width: '600px',
      data :{ admin : true }

      
    });  
  }
  
}
