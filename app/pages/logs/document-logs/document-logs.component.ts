import { Component } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';

interface DocumentLog {
  action: string;
  document_id: number;
  owner: string;
  user_id: number;
  created_date: string;
  created_time: string;
}
@Component({
  selector: 'app-document-logs',
  templateUrl: './document-logs.component.html',
  styleUrls: ['./document-logs.component.css']
})


export class DocumentLogsComponent {
  logs: DocumentLog[] = []

  filteredLogs: DocumentLog[] = [];
  actions: string[] = ["created", "updated", "deleted"];
  selectedAction: string = "";
  selectedDate: string = "";

  constructor(private logsService: LogsService) {}
  ngOnInit(){
   
  this.logsService.getdocument().subscribe(
    response => {
      this.logs = response;
      this.filteredLogs = this.logs;
    });
  }

  applyFilters() {
    let filteredLogs = this.logs;

    if (this.selectedAction) {
      filteredLogs = filteredLogs.filter(log => log.action === this.selectedAction);
    }

    if (this.selectedDate) {
      filteredLogs = filteredLogs.filter(log => log.created_date === this.selectedDate);
    }

    this.filteredLogs = filteredLogs;
  }
  
}