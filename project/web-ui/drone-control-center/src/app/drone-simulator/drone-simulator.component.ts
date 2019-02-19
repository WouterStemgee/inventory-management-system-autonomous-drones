import { Component, OnInit } from '@angular/core';

import { DroneSimulatorService } from './drone-simulator.service';

@Component({
  selector: 'app-drone-simulator',
  templateUrl: './drone-simulator.component.html',
  styleUrls: ['./drone-simulator.component.css']
})
export class DroneSimulatorComponent implements OnInit {

  constructor(private simulator: DroneSimulatorService) { }

  ngOnInit() {
    this.simulator.load();
  }
}
