import {Component, OnInit} from '@angular/core';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';

@Component({
  selector: 'app-flightpath-configuration',
  templateUrl: './flightpath-configuration.component.html',
  styleUrls: ['./flightpath-configuration.component.css']
})
export class FlightpathConfigurationComponent implements OnInit {

  constructor(private droneSimulatorService: DroneSimulatorService) { }

  return: string;
  land: string;
  aster: string;

  ngOnInit() {
      this.return = 'false';
      this.aster = 'no';
      this.updateOptions();
  }

  onChange() {
    this.updateOptions();
  }

  updateOptions() {
    this.droneSimulatorService.flightOptions = {
      return: this.return,
      aster: this.aster
    };
  }
}
