import { style } from '@angular/animations';
import { UserdataService } from './../../userdata.service';
import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddDocumentComponent } from 'src/app/pages/documents/add-document/add-document.component';
import { AddOrganisationComponent } from 'src/app/pages/organisations/add-organisation/add-organisation.component';
import { CreateOrganisationComponent } from 'src/app/pages/organisations/create-organisation/create-organisation.component';
import { AuthService } from 'src/app/services/auth.service';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  userOrganization : any
    organisation : any
    isSidebarVisible: boolean = false;
    isMobile: any
constructor(private UserdataService : UserdataService,private OrganisationService:OrganisationService , private router : Router, private dialog : MatDialog){}

ngOnInit() {
  this.UserdataService.getSharedUserData().subscribe(userData => {
    this.userOrganization = userData[0].organisation;
  });
}
@HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobile();
  }
  

  checkMobile() {
    this.isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
  }
addDocument(){
  const dialogRef = this.dialog.open(AddDocumentComponent,{
    width:'700px'});
}
joinCompany(){
  const dialogRef = this.dialog.open(AddOrganisationComponent, {
  width: '500px',
 
});
dialogRef.afterClosed().subscribe(result => {
  const fromdata = new FormData() ; 
  
  this.OrganisationService.joinCompany(fromdata).subscribe(response => {console.log(response)});
});
}
createCompany(){

  const dialogRef = this.dialog.open(CreateOrganisationComponent, {
    width: '500px',
   
  });

  dialogRef.afterClosed().subscribe(result => {
   
    window.location.reload()
  });
}


}