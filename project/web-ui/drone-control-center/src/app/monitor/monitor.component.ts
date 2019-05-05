import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';
import {GraphService} from '../graph.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})

export class MonitorComponent implements OnInit {


  constructor(public simulator: DroneSimulatorService, public graph: GraphService) {
  }

  ngOnInit() {
    if (this.simulator.loaded) {
      this.initDatasets();
    } else {
      this.simulator.onSimulatorLoadedEvent.subscribe((loaded) => {
        if (loaded) {
          this.initDatasets();
        }
      });
    }
  }

  initDatasets() {
    this.graph.positionDataset = this.simulator.drone.positionDataset;
    this.graph.batteryDataset = this.simulator.drone.batteryDataset;
  }

  showDatasets() {
    console.log(this.graph.positionDataset);
    console.log(this.graph.batteryDataset);
  }
}
