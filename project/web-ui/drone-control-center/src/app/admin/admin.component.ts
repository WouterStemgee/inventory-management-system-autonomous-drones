import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  deleteAllMaps() {
    this.http.deleteAllMaps()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteAllDrones() {
    this.http.deleteAllDrones()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
