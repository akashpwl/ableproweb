import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  public active = 1;
  ngOnInit(): void {
    this.dashboardService.eventEmitter.subscribe(
      (event) => {
        if (event.event == 'showAboutTab') {
          this.active = 2;
        }
      }
    );
  }
}
