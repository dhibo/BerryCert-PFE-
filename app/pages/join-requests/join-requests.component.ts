import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmDeleteComponent } from '../dialog/confirm-delete/confirm-delete.component';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-join-requests',
  templateUrl: './join-requests.component.html',
  styleUrls: ['./join-requests.component.css']
})
export class JoinRequestsComponent {
  requests : any ;
  invitations = [
    {
      avatarUrl: "https://github.com/twbs.png",
      title: "Invitation 1",
      message: "This is the first invitation message.",
      date: new Date(),
    },
    {
      avatarUrl: "https://github.com/twbs.png",
      title: "Invitation 2",
      message: "This is the second invitation message.",
      date: new Date("2022-04-05"),
    },
    {
      avatarUrl: "https://github.com/twbs.png",
      title: "Invitation 3",
      message: "This is the third invitation message.",
      date: new Date("2022-03-30"),
    },
  ];
  
  constructor(private OrganisationService : OrganisationService , public dialog: MatDialog){}
  ngOnInit(){
    this.OrganisationService.getRequests().subscribe(response => {this.requests = response, console.log(response)} )
  }
  

  getStatusClass(status: any): string | undefined {
    switch (status) {
      case 'Active':
        return 'badge badge-success rounded-pill d-inline';
      case 'Onboarding':
        return 'badge badge-primary rounded-pill d-inline';
      case 'Awaiting':
        return 'badge badge-warning rounded-pill d-inline';
      default:
        return undefined;
    }
  }

 
  confirmDelete(request : any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: {
        message: `Are you sure you want to delete ${request.id}?`,
        confirmFunction: () => {
          this.OrganisationService.deleteInvitation(request.id);
        }
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      // handle dialog result
    });
}
Accept(request:any){
  this.OrganisationService.acceptRequest(request.id).subscribe(response => { console.log(response)})
}
}
