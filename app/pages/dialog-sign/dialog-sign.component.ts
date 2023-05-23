import { Component , Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-dialog-sign',
  templateUrl: './dialog-sign.component.html',
  styleUrls: ['./dialog-sign.component.css']
})
export class DialogSignComponent {
  form !: FormGroup 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private FormBuilder : FormBuilder , private documentservice : DocumentService , private snackbar : MatSnackBar ) {
    this.form = this.FormBuilder.group({
      common: '',
    });
  }
  onSubmit() {
    const fromdata = new FormData() ; 
    fromdata.append('document_id',this.data.document_id);
    fromdata.append('common_name',this.form.get('common')?.value)
    this.documentservice.addrequest(fromdata).subscribe(
      response =>
      {
   
        this.snackbar.open('Request added successfully!', 'Close', {
          duration: 2000,});
          
        }
      );
  }
}
  

