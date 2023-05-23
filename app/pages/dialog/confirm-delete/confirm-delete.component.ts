import { DocumentService } from 'src/app/services/document.service';
import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private docservice : DocumentService) {}
  delette(){
    console.log(this.data)
    this.docservice.requestdelete(this.data.request.document_id).subscribe();
  }
}
