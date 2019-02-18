import { Component, OnInit } from '@angular/core';
import { Map } from './simulator/map.js';

@Component({
  selector: 'app-drone-simulator',
  templateUrl: './drone-simulator.component.html',
  styleUrls: ['./drone-simulator.component.css']
})
export class DroneSimulatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      const canvas = document.getElementById('canvas');
      const map = new Map(canvas);

      window.addEventListener('keydown', (event) => {
        map.keyhandler(event);
      });

      window.addEventListener('mousedown', (event) => {
        map.clickhandler(event);
      });

      map.start();
  }
}
