import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-sensor-configuration',
  templateUrl: './sensor-configuration.component.html',
  styleUrls: ['./sensor-configuration.component.css']
})
export class SensorConfigurationComponent implements OnInit {

  subscriptions = {speed: true,
            orientation: true,
            acceleration: true,
            position: false,
            battery: true};
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.updateSubscriptions(this.subscriptions).catch(console.log("wtf"));
  }

}
