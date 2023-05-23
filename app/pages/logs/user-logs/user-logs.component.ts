import { Component } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrls: ['./user-logs.component.css']
})
export class UserLogsComponent {
  logs: any[] = [ ]
  
  filteredLogs: any[] = [];
  filterBy: string = '';

  constructor(private logsService: LogsService) { }

  ngOnInit(): void {
   
    // Initialize filtered logs with all logs
    this.logsService.getmylogs().subscribe(
      response => {
        this.logs = response;
        this.filteredLogs = this.logs;
      })
  }

  filterLogs() {
    if (this.filterBy === '') {
      // If no filter is set, show all logs
      this.filteredLogs = this.logs;
    } else {
      // Filter logs by owner or action
      this.filteredLogs = this.logs.filter(log => log.owner.includes(this.filterBy) || log.action.includes(this.filterBy));
    }
  }

}