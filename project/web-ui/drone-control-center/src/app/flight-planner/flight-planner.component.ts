import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-flight-planner',
  templateUrl: './flight-planner.component.html',
  styleUrls: ['./flight-planner.component.css']
})
export class FlightPlannerComponent implements OnInit {

  constructor(private sharedService: SharedService) {
    sharedService.onNavigateEvent.emit('flight-planner');
  }


  ngOnInit() {
  }

}
