import {Injectable} from '@angular/core';
import {DroneSimulatorService} from './drone-simulator/presenter/drone-simulator.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  positionDataset;
  batteryDataset;


  constructor(public simulator: DroneSimulatorService) {
    this.simulator.onDataUpdateEvent.subscribe(() => {
      this.triggerDatasets();
    });
  }

  triggerDatasets() {
    this.positionDataset = this.positionDataset.slice();
    this.batteryDataset = this.batteryDataset.slice();
  }
}
