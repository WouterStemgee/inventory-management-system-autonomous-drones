import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-data',
  templateUrl: './graph-data.component.html',
  styleUrls: ['./graph-data.component.css']
})
export class GraphDataComponent implements OnInit {
  //ng2-charts
  boundedOptions = {
    responsive: true
  };

  boundedDataSet = [
    { data: [330, 600, 260, 700, 400, 500, 600], label: 'Account A' },
    { data: [120, 455, 100, 340, 400, 500, 600], label: 'Account B' },
    { data: [45, 67, 800, 500, 400, 500, 600], label: 'Account C' }
  ];

  boundedLabels = ['January', 'February', 'Mars', 'April','Mei', 'juni', 'juli'];

  boundedLegend = false;

  //ngx-charts
  D3Dataset : any[] = [
    {
      name: 'Cyan',
      series: [
        {
          name: 5,
          value: 2650
        },
        {
          name: 10,
          value: 2800
        },
        {
          name: 15,
          value: 2000
        },
        {
          name: 20,
          value: 2650
        },
        {
          name: 25,
          value: 2800
        },
        {
          name: 30,
          value: 1500
        }
      ]
    },
    {
      name: 'Yellow',
      series: [
        {
          name: 5,
          value: 2500
        },
        {
          name: 10,
          value: 3100
        },
        {
          name: 15,
          value: 2350
        },
        {
          name: 20,
          value: 2500
        },
        {
          name: 25,
          value: 3100
        },
        {
          name: 30,
          value: 1500
        }
      ]
    }
  ];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = false;
  yAxisLabel = 'Color Value';
  timeline = false;
  graphCurve = 

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() { }

  ngOnInit() {
  }

}
