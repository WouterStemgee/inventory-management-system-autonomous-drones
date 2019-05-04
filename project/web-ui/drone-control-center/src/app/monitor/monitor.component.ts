import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DroneSimulatorService} from "../drone-simulator/presenter/drone-simulator.service";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})

export class MonitorComponent implements OnInit {
  graphDataset = this.simulator.drone.positionDataset;

  constructor(private simulator : DroneSimulatorService) {

  }

  ngOnInit() {
  }

  showDataset() {
    console.log(this.simulator.drone.positionDataset);
  }
}
