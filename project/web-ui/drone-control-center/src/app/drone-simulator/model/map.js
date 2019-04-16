import {FlightPath} from "./flightpath.js";
import {ScanZone} from "./scanzone.js";
import {Obstacle} from "./obstacle";

export class Map {

  constructor() {
    this.name = '';
    this.id = 0;
    this.products = [];
    this.obstacles = [];
    this.scanzones = [];
    this.flightpath = undefined;
    this.dimensions = {}; // TODO
  }

  reset() {
    this.id = 0;
    this.name = '';
    this.flightpath = undefined;
    this.products = [];
    this.obstacles = [];
    this.scanzones = [];
  }

  loadMap(map) {
    this.id = map._id;
    this.name = map.name;
    this.flightpath = new FlightPath(this.id);
    map.products.forEach(p => this.addProduct(p));
    map.obstacles.forEach(o => this.addObstacle(o.positions));
    map.scanzones.forEach(sz => this.addScanZone(sz.name, sz.position.x, sz.position.y, sz.orientation, sz.range));
  }

  toJSON() {
    let map = {
      _id: this.id,
      name: this.name,
      products: [],
      obstacles: [],
      scanzones: []
    };
    this.obstacles.forEach((o) => map.obstacles.push({positions: o.positions}));
    this.scanzones.forEach((sz) => map.scanzones.push({
        name: sz.name,
        range: sz.range,
        orientation: sz.orientation,
        position: {x: sz.position.x, y: sz.position.y}
      })
    );
    this.products.forEach((p) => map.products.push({
        name: p.name,
        quantity: p.quantity,
      })
    );
    return map;
  }

  addProduct(product) {
    // TODO
  }

  removeProduct() {
    // TODO
  }

  addScanZone(name, x, y, orientation, range) {
    let sz = new ScanZone(x, y);
    sz.name = name;
    sz.range = range;
    sz.orientation = orientation;
    this.scanzones.push(sz);
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
