import { Waypoint } from './waypoint.js';

export class FlightPath {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.waypoints = [];
  }
  
  addWaypoint(x, y) {
    let waypoint = new Waypoint(x, y, this.tileSize);
    if (!this.waypoints.some(function(w){return w[waypoint.x] === waypoint.y;})) {
      this.waypoints.push(waypoint);
      console.log('Waypoint added: [X: ' + x + ', Y: ' + y + ']');
    }
    this.printWaypoints();
  }
  
  removeWayPoint(x, y) {
    // TODO
  }

  printWaypoints() {
    console.log(this.waypoints);
  }

  saveFlightPath() {
    // TODO
  }

  loadFlightPath() {
    // TODO
  }
  
  draw(context) {
    this.waypoints.forEach((w) => w.draw(context));
  }
}
