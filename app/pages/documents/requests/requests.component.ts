import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentService } from 'src/app/services/document.service';
import { ConfirmDeleteComponent } from '../../dialog/confirm-delete/confirm-delete.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatSort, Sort } from '@angular/material/sort';
import { SignRequest } from 'src/app/interfaces/sign-request';
import { Document } from 'src/app/interfaces/document';

import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  @ViewChild(MatSort) sort!: MatSort;
  requests: Array<SignRequest> = [];
  sortedData: SignRequest[]= [];
  dataSource!: MatTableDataSource<SignRequest>;
  pre :any
  user : any 
  
  
  constructor(public dialog: MatDialog ,private authservice : AuthService , private documentservice : DocumentService) {}
  async ngOnInit() {
    this.user = await this.authservice.getMe().toPromise();
    this.documentservice.getrequests().subscribe((response) => {
      this.requests = response;
      this.sortedData = this.requests.slice();    });
    
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

 
  deleteRequest(request: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: {
        request : request,
        id : request.id,
        message: `Are you sure you want to delete ${request.id}?`,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit()
    });
}
}