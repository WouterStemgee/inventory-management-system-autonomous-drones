import {Component} from '@angular/core';
import {SharedService} from './shared.service';
import {DroneSimulatorService} from './drone-simulator/presenter/drone-simulator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Drone Control Center';
  activeTab;

  constructor(private service: SharedService, public simulator: DroneSimulatorService) {
    this.simulator.load()
      .then(() => {
        simulator.onSimulatorLoadedEvent.emit(true);
      });
    service.onNavigateEvent.subscribe(
      (activeTab) => {
        this.activeTab = activeTab;
      }
    );
  }
}
