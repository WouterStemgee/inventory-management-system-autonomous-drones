import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {DroneSimulatorService} from './drone-simulator/presenter/drone-simulator.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private simulator: DroneSimulatorService) {
    this.connect();
  }

  connect() {
    const connection = new WebSocket(environment.baseWSUrl + 'red/ws/data', ['soap', 'xmpp']);
    connection.onopen = () => {
      console.log('WebSocket connected.');
    };

    connection.onerror = (err) => {
      console.log('WebSocket Error', err);
      connection.close();
    };

    connection.onmessage = (e) => {
      this.simulator.onDataUpdateEvent.emit(e);
    };

    connection.onclose = (e) => {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(() => {
        this.connect();
      }, 1000);
    };
  }
}
