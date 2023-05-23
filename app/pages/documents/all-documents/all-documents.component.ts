import { DocumentService } from 'src/app/services/document.service';
import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { AskForRequestComponent } from '../../ask-for-request/ask-for-request.component';

@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.css']
})
export class AllDocumentsComponent {
  
  documents:any;
  blob : any ;

  constructor(private documentservice: DocumentService  , private dialog: MatDialog) { }

  ngOnInit(): void {
    this.documentservice.get().subscribe(
      response => {this.documents = response , console.log(response) },
      error => console.log(error)
    );
    
  }
  downloadDocument(document:any) {
    this.documentservice.download(document.id).subscribe(response =>  console.log(response))  }
  editDocument(document : any){}
  getDocumentImage(document: any): string {
    if (document.type === 'pdf') {
      return './assets/images/pdf.png';
    } else(document.type === 'xml') 
      return './assets/images/xml.jpg';
    
    
  }
  openAccessRequestDialog(document:any){
  const dialogRef = this.dialog.open(AskForRequestComponent,{width:'400px'});

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Handle the form data here
    }
  });

  }
}
