import {Component} from '@angular/core';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(public simulator: DroneSimulatorService, public shared: SharedService) {
    this.shared.onNavigateEvent.emit('dashboard');
  }

}
