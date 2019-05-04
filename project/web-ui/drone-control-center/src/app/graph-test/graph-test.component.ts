import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DroneSimulatorService} from "../drone-simulator/presenter/drone-simulator.service";
import {NoInputRenameRule} from "codelyzer";
import {isUndefined} from "util";

@Component({
  selector: 'app-graph-test',
  templateUrl: './graph-test.component.html',
  styleUrls: ['./graph-test.component.css']
})
export class GraphTestComponent implements OnInit {
  /** Kan nu eender welke grafiek maken, de bedoeling is nu dat vanaf de drone start, dat hij de waarden gaat beginnen pushen (vanaf de knop ingedrukt is),
   * nu gaat het dus nog niet van meerdere grafieken te tonen maar dat zou dus geen probleem mogen zijn. Kan dit pas doen als de knoppen effectief ingesteld zijn.
   * Kan er voor zorgen dat het aantal waarden die in de grafiek getoont worden op een bepaald aantal blijven zodat het overzichtelijk blijft maar normaal is
   * er daar geen probleem mee.
   */

  //alle dependencies van de grafieken
  @Input() showYAxisLabel;
  @Input() yAxisLabel;
  @Input() yScaleMax;
  @Input() yScaleMin;
  @Input() showLegend;
  @Input() sort;
  @Input() dataset;

  @Output() resultsChange = new EventEmitter();

  dimensions = [400, 300];
  //X-axis
  showXAxis = true;
  showXAxisLabel = false;
  //xAxisLabel = 'Number';
  //Y-axis
  showYAxis = true;
  //style + data
  gradient = false;
  timeline = false;
  animations = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(public simulator : DroneSimulatorService) {

  }

  ngOnInit() {

  }

  triggerGraph() {
    console.log("graph getriggered\n");
    this.dataset = this.simulator.drone.positionDataset;
    this.dataset = this.dataset.slice();
    this.resultsChange.emit(this.dataset);
  }

  /*pushValue() {
    //dit triggerded de grafiek en re-rendered hem
    this.dataset = this.simulator.drone.positionDataset;
    this.dataset = this.dataset.slice();
  }*/

  xAxisTickFormatting(val) {
    return new Date(val).toLocaleTimeString();
  }

  onDeactivate(event) {
    console.log(event);
  }
}
