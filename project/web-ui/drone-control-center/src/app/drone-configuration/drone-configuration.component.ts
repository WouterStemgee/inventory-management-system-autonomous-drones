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

  loadedConfig;
  draftConfig;

  ngOnInit() {
    this.http.getDroneDbInformation().then(
      res => {
        this.loadedConfig = res;
        this.draftConfig = res;
        this.http.updateDroneConfiguration(this.loadedConfig.properties.radius.toString());
      });
  }

  setProperties() {
    this.loadedConfig = this.draftConfig;
    this.http.storeDroneDbInformation(this.loadedConfig);
    this.http.updateDroneConfiguration(this.loadedConfig.properties.radius.toString());
  }
}
