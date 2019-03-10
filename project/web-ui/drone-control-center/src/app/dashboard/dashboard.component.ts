import {Component} from '@angular/core';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(public simulator: DroneSimulatorService) {
  }

}
