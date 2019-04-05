import {FlightPath} from "./flightpath.js";
import {ScanZone} from "./scanzone.js";
import {Obstacle} from "./obstacle";

export class Map {

  constructor() {
    this.name = '';
    this.id = 0;
    this.obstacles = [];
    this.scanzones = [];
    this.flightpath = undefined;
    this.dimensions = {};
  }

  reset() {
    this.id = 0;
    this.name = '';
    this.flightpath = undefined;
    this.obstacles = [];
    this.scanzones = [];
  }

  loadMap(map) {
    this.id = map._id;
    this.name = map.name;
    this.flightpath = new FlightPath(this.id);
    map.obstacles.forEach(o => this.addObstacle(o.positions));
    map.scanzones.forEach(p => this.addScanZone(p.name, p.position.x, p.position.y, p.orientation, p.range));
  }

  toJSON(name) {
    let map = {
      _id: this.id,
      name: name,
      obstacles: [],
      scanzones: [],
      products: []
    };
    this.obstacles.forEach((o) => map.obstacles.push({positions: o.positions}));
    this.scanzones.forEach((p) => map.scanzones.push({
        name: p.name,
        range: p.range,
        orientation: p.orientation,
        position: {x: p.position.x, y: p.position.y}
      })
    );
    return map;
  }

  addScanZone(name, x, y, orientation, range) {
    let p = new ScanZone(x, y);
    p.name = name;
    p.range = range;
    p.orientation = orientation;
    this.scanzones.push(p);
  }

  removeScanZone(x, y) {
    for (let i = this.scanzones.length - 1; i >= 0; i--) {
      if (this.scanzones[i].position.x === x && this.scanzones[i].position.y === y) {
        this.scanzones.splice(i, 1);
      }
    }
  }

  addObstacle(positions) {
    let o = new Obstacle();
    o.positions = positions;
    this.obstacles.push(o);
  }

  removeObstacle(positions) {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      if (
        this.obstacles[i].positions[0].x === positions[0].x &&
        this.obstacles[i].positions[0].y === positions[0].y &&
        this.obstacles[i].positions[1].x === positions[1].x &&
        this.obstacles[i].positions[1].y === positions[1].y)  {
        this.obstacles.splice(i, 1);
      }
    }
  }

}
