import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.css']
})
export class MapEditorComponent implements OnInit {

  constructor(private sharedService: SharedService) {
    sharedService.onNavigateEvent.emit('map-editor');
  }


  ngOnInit() {
  }

}
