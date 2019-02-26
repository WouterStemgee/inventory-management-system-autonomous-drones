import {Waypoint} from './waypoint.js';

export class FlightPath {
  constructor(tileSize, mapId, takeoff, landing) {
    this.mapId = mapId;
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
    let flightpath = {
      mapId : 0,
      waypoints : []
    };
    flightpath.waypoints.mapId = this.mapId;
    flightpath.waypoints.push(this.takeoff);
    this.waypoints.forEach(waypoint => flightpath.waypoints.push({x: waypoint.x, y: waypoint.y}));
    flightpath.waypoints.push(this.landing);
    return flightpath;
  }

  loadFlightPath(flightpath) {
    // TODO
  }

  draw(context) {
    this.waypoints.forEach((w) => w.draw(context));
  }
}
