import {Component, OnInit} from '@angular/core';

import {DroneSimulatorService} from '../presenter/drone-simulator.service';

@Component({
  selector: 'app-drone-simulator',
  templateUrl: './drone-simulator.component.html',
  styleUrls: ['./drone-simulator.component.css']
})
export class DroneSimulatorComponent implements OnInit {

  constructor(public simulator: DroneSimulatorService) {
  }

  ngOnInit() {
    this.simulator.initialized = false;
    this.simulator.eventListenersRegistered = false;
    if (this.simulator.loaded) {
      this.simulator.init();
    } else {
      this.simulator.onSimulatorLoadedEvent.subscribe((loaded) => {
        if (loaded) {
          this.simulator.init();
        }
      });
    }
  }
}
