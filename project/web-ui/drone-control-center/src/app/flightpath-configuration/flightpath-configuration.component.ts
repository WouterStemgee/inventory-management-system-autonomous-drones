import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flightpath-configuration',
  templateUrl: './flightpath-configuration.component.html',
  styleUrls: ['./flightpath-configuration.component.css']
})
export class FlightpathConfigurationComponent implements OnInit {

  constructor() { }

  return: string;

  ngOnInit() {
  }

  returnChanged() {
    console.log(this.return);
  }
}
