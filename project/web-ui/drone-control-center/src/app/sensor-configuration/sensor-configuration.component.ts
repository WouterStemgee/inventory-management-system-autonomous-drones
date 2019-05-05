import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-sensor-configuration',
  templateUrl: './sensor-configuration.component.html',
  styleUrls: ['./sensor-configuration.component.css']
})
export class SensorConfigurationComponent implements OnInit {

  subscriptions = {
    speed: true,
    orientation: true,
    acceleration: true,
    position: true,
    battery: true
  };

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.subChanged();
  }

  subChanged() {
    this.http.updateSubscriptions(this.subscriptions)
      .catch((err) => {
        console.log(err);
      });
  }

}
