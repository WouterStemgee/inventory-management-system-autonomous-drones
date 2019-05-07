import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  // alle dependencies van de grafieken
  @Input() showYAxisLabel;
  @Input() yAxisLabel;
  @Input() yScaleMax;
  @Input() yScaleMin;
  @Input() showLegend;
  @Input() sort;
  @Input() dataset;

  autoScale = false;
  timeline = false;

  // X-axis
  showXAxis = true;
  showXAxisLabel = true;
  // xAxisLabel = 'Number';

  // Y-axis
  showYAxis = true;

  // style + data
  gradient = false;
  animations = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  ngOnInit() {
  }


  xAxisTickFormatting(val) {
    return new Date(val).toLocaleTimeString();
  }

  onActivate(event) {
    console.log(event);
  }

  onDeactivate(event) {
    console.log(event);
  }
}
