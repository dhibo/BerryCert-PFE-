import { DocumentService } from './../../../services/document.service';
import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from 'src/app/interfaces/document';
@Component({
  selector: 'app-public-documents',
  templateUrl: './public-documents.component.html',
  styleUrls: ['./public-documents.component.css']
})
export class PublicDocumentsComponent {
  documents !: Document[]; 

  constructor(private DocumentService : DocumentService  ) {
    this.DocumentService.get().subscribe(response => {
      console.log('response');
        this.documents = response;
      });
   }

  

  download (document : any) {

    this.DocumentService.download(document.id).subscribe((response: Blob)  => {
      const fileName = `${document.title}.${document.filetype}`;
      saveAs(response,fileName);
    })
    
  }

  private extractFileNameFromHeaders(headers: HttpHeaders): string {
    // Extract the 'content-disposition' header
    const contentDisposition = headers.get('content-disposition');
    if (contentDisposition) {
      // Extract the file name from the header using regex
      const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = fileNameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        return matches[1].replace(/['"]/g, '');
      }
    }
    return '';
  }
}

