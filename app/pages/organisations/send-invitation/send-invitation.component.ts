import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.component.html',
  styleUrls: ['./send-invitation.component.css']
})
export class SendInvitationComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder , private OrganisationService : OrganisationService, private dialogRef: MatDialogRef<SendInvitationComponent>) {
    this.form = this.formBuilder.group({
      email: '',

    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      const fromdata = new FormData();
      fromdata.append('guest', this.form.value.email);
      console.log(fromdata);
      this.OrganisationService.sendinvitation(fromdata).subscribe();
      window.location.reload()
      this.dialogRef.close();
      }
     else {
      this.form.markAllAsTouched();
    }
}
}