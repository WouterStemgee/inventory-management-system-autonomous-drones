import {Component, OnInit} from '@angular/core';
import {DroneDataDataSource} from './drone-data-datasource';
import {DroneSimulatorService} from '../drone-simulator/presenter/drone-simulator.service';

@Component({
  selector: 'app-drone-data',
  templateUrl: './drone-data.component.html',
  styleUrls: ['./drone-data.component.css']
})
export class DroneDataComponent implements OnInit {
  dataSource: DroneDataDataSource;
  displayedColumns: string[] = ['name', 'radius', 'battery', 'position', 'speed', 'acceleration', 'pitch', 'roll', 'yaw'];

  constructor(public simulator: DroneSimulatorService) {

  }

  ngOnInit() {
    this.dataSource = new DroneDataDataSource(this.simulator);
  }
}
