import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Document } from 'src/app/interfaces/document';
import { DocumentService } from 'src/app/services/document.service';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent {
  cert:any ;
  @ViewChild('content') content: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private clipboard: Clipboard ,private docservice : DocumentService) {
    console.log(data.id)
    this.docservice.getcert(data.id).subscribe(response => { this.cert = response})

  }

  copyContent() {
    this.clipboard.copy(this.content.nativeElement.innerText);
  }
  
  validateSignature(){

  }
}
