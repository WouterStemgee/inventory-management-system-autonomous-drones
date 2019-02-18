import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private sharedService: SharedService) {
    sharedService.onNavigateEvent.emit('inventory');
  }


  ngOnInit() {
  }

}
