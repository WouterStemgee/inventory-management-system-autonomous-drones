import {Component, Input, OnInit} from '@angular/core';

import {DroneSimulatorService} from '../presenter/drone-simulator.service';
import {SharedService} from '../../shared.service';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-drone-simulator',
  templateUrl: './drone-simulator.component.html',
  styleUrls: ['./drone-simulator.component.css']
})
export class DroneSimulatorComponent implements OnInit {

  @Input() height;

  constructor(public auth: AuthenticationService, public simulator: DroneSimulatorService, public shared: SharedService) {
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
