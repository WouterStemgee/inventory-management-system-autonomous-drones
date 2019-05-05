import {Component} from '@angular/core';
import {SharedService} from './shared.service';
import {DroneSimulatorService} from './drone-simulator/presenter/drone-simulator.service';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from './authentication.service';
import {WebsocketService} from './websocket.service';
import {GraphService} from './graph.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Drone Control Center';
  activeTab;

  constructor(public auth: AuthenticationService, private service: SharedService, public simulator: DroneSimulatorService, private toastr: ToastrService, public socket: WebsocketService, public graph: GraphService) {
    this.simulator.load()
      .then(() => {
        simulator.onSimulatorLoadedEvent.emit(true);
      });
    service.onNavigateEvent.subscribe(
      (activeTab) => {
        this.activeTab = activeTab;
      }
    );
    simulator.onAlertEvent.subscribe(
      (alert) => {
        switch (alert.type) {
          case 'info':
            this.toastr.info(alert.message, alert.title);
            break;
          case 'error':
            this.toastr.error(alert.message, alert.title);
            break;
          case 'success':
            this.toastr.success(alert.message, alert.title);
            break;
          case 'warning':
            this.toastr.warning(alert.message, alert.title);
            break;
        }
        console.log(alert.message);
      }
    );
  }
}
