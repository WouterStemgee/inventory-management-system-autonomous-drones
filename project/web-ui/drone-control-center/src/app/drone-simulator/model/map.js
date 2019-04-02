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
    map.scanzones.forEach(p => this.addScanZone(p.name, p.quantity, p.position.x, p.position.y, p.orientation, p.range));
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
        quantity: p.quantity,
        position: {x: p.x, y: p.y}
      })
    );
    return map;
  }

  addScanZone(name, quantity, x, y, orientation, range) {
    let p = new ScanZone(x, y);
    p.name = name;
    p.range = range;
    p.orientation = orientation;
    p.quantity = quantity;
    this.scanzones.push(p);
  }

  addObstacle(positions) {
    let o = new Obstacle();
    o.positions = positions;
    this.obstacles.push(o);
  }

}
