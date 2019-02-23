import {Waypoint} from './waypoint.js';

export class FlightPath {
  constructor(tileSize, takeoff, landing) {
    this.tileSize = tileSize;
    this.waypoints = [];
    this.takeoff = takeoff;
    this.landing = landing;
  }


  addWaypoint(x, y) {
    let waypoint = new Waypoint(x, y, this.tileSize);
    this.waypoints.push(waypoint);
    console.log('Waypoint added: [X: ' + x + ', Y: ' + y + ']');
  }

  removeWaypoint(x, y) {
    for (let i = this.waypoints.length - 1; i >= 0; i--) {
      if (this.waypoints[i].x === x && this.waypoints[i].y === y) {
        this.waypoints.splice(i, 1);
      }
    }
    console.log('Waypoint removed: [X: ' + x + ', Y: ' + y + ']');
  }

  printWaypoints() {
    console.log(this.waypoints);
  }

  saveFlightPath() {
    let waypointCoords = [];
    waypointCoords.push(this.takeoff);
    this.waypoints.forEach(waypoint => waypointCoords.push({x: waypoint.x, y: waypoint.y}));
    waypointCoords.push(this.landing);
    return waypointCoords;
  }

  loadFlightPath(flightpath) {
    // TODO
  }

  draw(context) {
    this.waypoints.forEach((w) => w.draw(context));
  }
}
