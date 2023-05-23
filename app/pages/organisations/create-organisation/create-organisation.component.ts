import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-create-organisation',
  templateUrl: './create-organisation.component.html',
  styleUrls: ['./create-organisation.component.css']
})


export class CreateOrganisationComponent {
  form: FormGroup;
  countries :any
  provincesData :any
  provinces : any

  constructor(private http:HttpClient ,private formBuilder: FormBuilder, private OrganisationService : OrganisationService, private dialogRef: MatDialogRef<CreateOrganisationComponent>) {
    this.http.get<any>('/assets/json/world.json').subscribe(response => {
      this.countries = response 
    })
    this.http.get<any>('/assets/json/subdivisions.json').subscribe(response => {
      this.provinces = response 
    })
    this.form = this.formBuilder.group({
      name: '',
      description: '',
      country :'',
      provience:'',
      locality:'',

    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }
 

  onSubmit(): void {
    if (this.form.valid) {
      const fromdata = new FormData();
      fromdata.append('name', this.form.value.name);
      fromdata.append('description', this.form.value.description);
      fromdata.append('country_name', this.form.value.country);
      fromdata.append('state_or_province_name', this.form.value.provience);
      fromdata.append('locality_name', this.form.value.locality);

      console.log(fromdata);
      this.OrganisationService.createOrganisation(fromdata).subscribe(response => {
        console.log(response);
        this.dialogRef.close();
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  
}


