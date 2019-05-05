import {Injectable} from '@angular/core';
import {DroneSimulatorService} from './drone-simulator/presenter/drone-simulator.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  positionDataset: any[];
  batteryDataset: any[];

  tick = 0;


  constructor(public simulator: DroneSimulatorService) {
    this.positionDataset = [];
    this.batteryDataset = [];
    this.simulator.onDataUpdateEvent.subscribe(() => {
      if (simulator.initialized) {
        if (this.tick <= 20) {
          this.tick++;
        } else {
          this.triggerDatasets();
          this.tick = 0;
        }
      }
    });
  }

  triggerDatasets() {
    this.positionDataset = this.positionDataset.slice();
    this.batteryDataset = this.batteryDataset.slice();
  }
}
