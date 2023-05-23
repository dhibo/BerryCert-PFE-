import { MatDialog, MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component , Inject } from '@angular/core';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent {
  isAdmin : any ; 
  invitations : any ;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private OrganisationService : OrganisationService , private dialogRef : MatDialogRef<InvitationsComponent> ){}
  ngOnInit(){
    this.OrganisationService.getInvitations().subscribe(response => { this.invitations = response ; console.log(response)}) ;
    this.isAdmin = this.data.admin
  }
  Accept(invitation:any){
    
    this.OrganisationService.acceptInvitation(invitation.id).subscribe( response => { 
      console.log();
      this.dialogRef.close();

    })
  }
  Delete(invitaiton:any){
    this.OrganisationService.deleteInvitation(invitaiton.id).subscribe( response => { 
      console.log();
      this.dialogRef.close();

  })

}
getTimeDifference(x : any): string {
  const specifiedTime: Date = new Date(x);
  const currentTime: Date = new Date();
  const timeDifference: number = currentTime.getTime() - specifiedTime.getTime();

  if (timeDifference >= 31536000000) { // 1 year = 31536000000 ms
    const yearsDifference: number = Math.floor(timeDifference / 31536000000);
    return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''} ago`;
  } else if (timeDifference >= 2592000000) { // 1 month = 2592000000 ms
    const monthsDifference: number = Math.floor(timeDifference / 2592000000);
    return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
  } else if (timeDifference >= 86400000) { // 1 day = 86400000 ms
    const daysDifference: number = Math.floor(timeDifference / 86400000);
    return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
  } else if (timeDifference >= 3600000) { // 1 hour = 3600000 ms
    const hoursDifference: number = Math.floor(timeDifference / 3600000);
    return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
  } else if (timeDifference >= 60000) { // 1 minute = 60000 ms
    const minutesDifference: number = Math.floor(timeDifference / 60000);
    return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
  } else {
    const secondsDifference: number = Math.floor(timeDifference / 1000);
    return `${secondsDifference} second${secondsDifference > 1 ? 's' : ''} ago`;
  }
}
}
