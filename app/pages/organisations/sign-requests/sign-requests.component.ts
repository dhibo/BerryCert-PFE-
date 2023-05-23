import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';
import { SignRequest } from 'src/app/interfaces/sign-request';

@Component({
  selector: 'app-sign-requests',
  templateUrl: './sign-requests.component.html',
  styleUrls: ['./sign-requests.component.css']
})
export class SignRequestsComponent {
  @ViewChild(MatSort) sort: MatSort | undefined;
  requests: Array<SignRequest> = [];
  sortedData : Array<SignRequest> = [];
  constructor(
    private documentservice: DocumentService,
    private MatSnackBar : MatSnackBar,
  ) {}

  ngOnInit() {
    this.documentservice.getrequests().subscribe(response => {
      this.requests = response;
      this.sortedData = this.requests.slice();   
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  sortData(sort: Sort) {
    const data = this.requests.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData  = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'filetype':
          return this.compare(a.document.filetype, b.document.filetype, isAsc);
        case 'title':
          return this.compare(a.document.title, b.document.title, isAsc);
        case 'privacy':
          return this.compare(a.document.privacy, b.document.privacy, isAsc);
        case 'signedStatus':
          return this.compare(a.document.signed_status, b.document.signed_status, isAsc);
        case 'owner':
          return this.compare(a.owner, b.owner, isAsc);
        default:
          return 0;
      }
    });

  }

  accept(id: any) {
    this.documentservice.acceptrequest(id).subscribe(response => {
      this.ngOnInit();
      this.MatSnackBar.open('Request Accepted', 'Close', {
        duration: 2000
        }
        )
      });
  }

  reject(id: any) {
    this.documentservice.rejectrequest(id).subscribe(response => {
      console.log(response);
    });
  }

  getStatusClass(status: any): string | undefined {
    switch (status) {
      case 'Active':
        return 'badge badge-success rounded-pill d-inline';
      case 'Onboarding':
        return 'badge badge-primary rounded-pill d-inline';
      case 'Awaiting':
        return 'badge badge-warning rounded-pill d-inline';
      default:
        return undefined;
    }
  }
}