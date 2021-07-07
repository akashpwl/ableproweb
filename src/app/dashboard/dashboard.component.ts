import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , OnDestroy{

  constructor() { }
  
  ngOnInit (): void {
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
    
  }

}
