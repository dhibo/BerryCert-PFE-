import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef,  } from '@angular/material/dialog';
import { DocumentService } from 'src/app/services/document.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent {
  form: FormGroup;
  files: File[] = [];

  constructor( private snackBar: MatSnackBar, private formBuilder: FormBuilder , private docservice : DocumentService , private dialogRef: MatDialogRef<AddDocumentComponent>) {
    this.form = this.formBuilder.group({
      description: '',
    });
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onCancel(){
    this.dialogRef.close();

  }

   async onSubmit() {
    const file = this.files[0];
  
    const formdata = new FormData();
    formdata.append('description',this.form.get('description')?.value);
    formdata.append('fileDoc',file);
  
   this.docservice.add(formdata).subscribe((response) => 
   {
    if (response.status == 201) {
      this.snackBar.open('Document added successfully!', 'Close',
        {
          duration: 3000,

        });
    }


    this.dialogRef.close();
  }
    );
  }
}