import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentService } from 'src/app/services/document.service';
import { AddDocumentComponent } from '../add-document/add-document.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSignComponent } from '../../dialog-sign/dialog-sign.component';
import { Document } from 'src/app/interfaces/document';
import { CertificateComponent } from '../../dialog/certificate/certificate.component';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent {
  constructor (private AuthService:AuthService ,  private snackbar : MatSnackBar , private dialog : MatDialog , private documentservice : DocumentService , private cdr: ChangeDetectorRef){}
  documents : Array<Document> = [] ;
  user : Array<User> = [] ;
  isEditing : any 
  signedDocuments: Array<Document> = [];
  expirationDates: any = {};

  ngOnInit() {
    this.AuthService.getMe().subscribe(response => { this.user = response; console.log(response)}); 
    this.documentservice.get().subscribe(response => {
      this.documents = response.filter(document => document.owner === this.user[0].email)
      .map(document => ({
        ...document,
        isEditing: false // Add the isEditing property with the initial value
      })
     )
     console.log(this.documents);
    
    console.log(this.documents);
      this.signedDocuments = this.documents.filter(document => document.signed_status === 'Signed');
      for (const document of this.signedDocuments) {
        this.documentservice.getcert(document.id).subscribe(response => {
          const expirationDate = new Date(response.not_valid_after);
          const currentDate = new Date();
          const diffInTime = expirationDate.getTime() - currentDate.getTime();
          const diffdays = Math.ceil(diffInTime / (1000 * 3600 * 24)); 
          this.expirationDates[document.id] = diffdays;
        });
      }    });
  }
 
  delete(document:any){
    this.documentservice.delete(document.id).subscribe(response => {console.log(response)});
    this.ngOnInit();


  }
  showCertificate(document : Document){
    const dialogRef = this.dialog.open(CertificateComponent, {
      width: '500px' , 
      data : document ,
    });
  }
 
 
  openAddDocumentDialog() {
    
  const dialogRef = this.dialog.open(AddDocumentComponent, {
    width: '700px'
  });

  dialogRef.afterClosed().toPromise().then(() => {
    this.ngOnInit()
  });
}

// fil add request lezmou itchecki kan el document deja aaleh request wala la

addrequest(document: any): void {
  const dialogRef = this.dialog.open(DialogSignComponent, {
    width: '400px',
    data: {
      message: `Are you sure you want to sign  ${document.title}?`,
      document_id : document.id
    },
  });
  dialogRef.afterClosed().subscribe(
    respone => { 
      this.ngOnInit();

    }
  )
  }
    

  


toggleEditMode(document: Document) {
  this.documents.forEach(doc => {
    if (doc === document) {
      doc.isEditing = true;
    } else {
      doc.isEditing = false;
    }
  });}
  save(document: any): void {
    const formdata = new FormData();
    formdata.append('privacy',document.privacy)
    formdata.append('description',document.description)
    formdata.append('title',document.title)
    this.documentservice.update(formdata,document.id).subscribe( response => {
      console.log(response)
    })
    this.ngOnInit();
  }
  
  cancelEdit(document: any): void {
  // handle canceling of document editing here
  }

}
