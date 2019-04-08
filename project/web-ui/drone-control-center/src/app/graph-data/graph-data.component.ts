import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-data',
  templateUrl: './graph-data.component.html',
  styleUrls: ['./graph-data.component.css']
})
export class GraphDataComponent implements OnInit {
  boundedOptions = {
    responsive: true
  };

  boundedDataSet = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  boundedLabels = ['January', 'February', 'Mars', 'April'];

  boundedLegend = false;

  constructor() { }

  ngOnInit() {
  }

}
