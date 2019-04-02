import {Component, OnInit} from '@angular/core';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-drone-configuration',
  templateUrl: './drone-configuration.component.html',
  styleUrls: ['./drone-configuration.component.css']
})
export class DroneConfigurationComponent implements OnInit {

  constructor(private http: HttpService, public simulator: DroneSimulatorService) {
  }

  ngOnInit() {
  }

  setRadius() {
    const droneConfiguration = {
      droneId: 0,
      radius: this.simulator.drone.radius
    };

    this.http.updateDroneConfiguration(droneConfiguration.radius.toString());
  }

}
