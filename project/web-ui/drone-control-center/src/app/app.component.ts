import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Drone Control Center';
  activeTab;

  constructor(service: SharedService) {
    service.onNavigateEvent.subscribe(
      (activeTab) => {
        this.activeTab = activeTab;
      }
    );
  }
}
