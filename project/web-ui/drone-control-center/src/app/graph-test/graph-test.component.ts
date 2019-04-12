import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-test',
  templateUrl: './graph-test.component.html',
  styleUrls: ['./graph-test.component.css']
})
export class GraphTestComponent implements OnInit {

  D3Dataset : any[] = [
    {
      name: 'remaining',
      series: [
        {
          name: 0 ,
          value: 0
        },
        {
          name: 5 ,
          value: 0
        },
        {
          name: 10 ,
          value: 85
        },
        {
          name: 15 ,
          value:84
        }
      ]
    }
  ];

  dimensions = [400, 300];
  //X-axis
  showXAxis = false;
  showXAxisLabel = false;
  xAxisLabel = 'Number';
  //Y-axis
  showYAxis = true;
  showYAxisLabel = false;
  yAxisLabel = 'Color Value';
  yScaleMax : number = 100;
  yScaleMin : number = 0;
  //style + data
  gradient = false;
  showLegend = false;
  timeline = false;
  time : number = 20;
  batteryState : number = 84;
  entries : any[] = this.D3Dataset;
  //animations = Data

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() { }

  ngOnInit() {
  }

  /*onSelect(event) {
    console.log(event);
  }*/



  /** Data toevoegen: eerste waarde is een timestamp, voorlopig veronderstel ik enkel de batterij met een timestamp
   * en waarde van 0 tot 1 hoeveel de batterij nog bedraagt. **/

  pushValue() {
    if(!Date.now()) {
      Date.now = function() { return new Date().getTime(); }
    }
    this.D3Dataset[0].series.push({name: this.time, value: this.batteryState--});
    if(this.D3Dataset[0].series.length > 1000) {
      this.D3Dataset[0].series.shift();
      this.entries = this.D3Dataset[0].series.slice(this.D3Dataset[0].length-10, this.D3Dataset[0].length);
    }
    //dit triggerded de grafiek en re-rendered hem
    this.D3Dataset = this.D3Dataset.slice();
    this.time += 5;
  }

  onClick() {
    this.pushValue();

  }

}
