import {Component, OnInit} from '@angular/core';

import {DroneSimulatorService} from '../presenter/drone-simulator.service';

@Component({
  selector: 'app-drone-simulator',
  templateUrl: './drone-simulator.component.html',
  styleUrls: ['./drone-simulator.component.css']
})
export class DroneSimulatorComponent implements OnInit {

  alerts = [];

  constructor(private simulator: DroneSimulatorService) {
    let i = 0;
    simulator.alertEvent.subscribe(
      (alertMessage) => {
        this.alerts.push({
          id: i++,
          type: 'warning',
          message: alertMessage
        });
      }
    );
  }

  close(alert) {
    for (let i = this.alerts.length - 1; i >= 0; i--) {
      if (this.alerts[i].id === alert.id) {
        this.alerts.splice(i, 1);
      }
    }
  }

  ngOnInit() {
    this.simulator.initialized = false;
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
