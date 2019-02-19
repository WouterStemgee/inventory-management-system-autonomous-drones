import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import {DroneSimulatorService} from '../drone-simulator/drone-simulator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private sharedService: SharedService, private simulator: DroneSimulatorService) {
    sharedService.onNavigateEvent.emit('dashboard');
  }

  ngOnInit() {
  }

}
