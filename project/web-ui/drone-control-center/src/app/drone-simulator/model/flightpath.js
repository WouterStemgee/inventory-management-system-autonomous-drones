import {Tile} from "./tile";

export class FlightPath {
  constructor(tileSize, mapId, takeoff, landing) {
    this.mapId = mapId;
    this.tileSize = tileSize;
    this.waypoints = [];
    this.optimalPath = [];
    this.takeoff = takeoff;
    this.landing = landing;
  }

  addWaypoint(x, y) {
    let waypoint = new Tile(x, y, this.tileSize, '#699868');
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

  setOptimalPath(optimalPath) {
    this.optimalPath = [];
    for (let i = 0; i < optimalPath.length; i++) {
      let tile = new Tile(optimalPath[i].x, optimalPath[i].y, this.tileSize, '#4286f4');
      this.optimalPath[i] = tile;
    }
  }

  toJSON() {
    let flightpath = {
      mapId: 0,
      waypoints: []
    };
    flightpath.mapId = this.mapId;
    flightpath.waypoints.push(this.takeoff);
    this.waypoints.forEach(waypoint => flightpath.waypoints.push({x: waypoint.x, y: waypoint.y}));
    flightpath.waypoints.push(this.landing);
    return flightpath;
  }

  draw(context) {
    this.optimalPath.forEach((t) => t.draw(context));
    this.waypoints.forEach((w) => w.draw(context));
  }
}
