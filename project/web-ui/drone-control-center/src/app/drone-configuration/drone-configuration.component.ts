import {Component, OnInit} from '@angular/core';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';
import {HttpService} from '../http.service';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-drone-configuration',
  templateUrl: './drone-configuration.component.html',
  styleUrls: ['./drone-configuration.component.css']
})
export class DroneConfigurationComponent implements OnInit {

  constructor(private http: HttpService, public simulator: DroneSimulatorService, private auth: AuthenticationService) {
  }

  ngOnInit() {
  }

  setProperties() {
    this.simulator.updateDrone();
  }


}
