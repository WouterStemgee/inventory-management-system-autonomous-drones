import {FlightPath} from "./flightpath.js";
import {ScanZone} from "./scanzone.js";
import {Obstacle} from "./obstacle";

export class Map {

  constructor() {
    this.name = '';
    this.id = 0;
    this.size = {width: 0, height: 0};
    this.obstacles = [];
    this.scanzones = [];
    this.flightpath = undefined;
    this.dimensions = {}; // TODO
  }

  reset() {
    this.id = 0;
    this.name = '';
    this.size.width = 0;
    this.size.height = 0;
    this.flightpath = undefined;
    this.obstacles = [];
    this.scanzones = [];
  }

  loadMap(map) {
    this.id = map._id;
    this.size = map.size;
    this.name = map.name;
    this.flightpath = new FlightPath(this.id);
    map.obstacles.forEach(o => this.addObstacle(o.positions));
    map.scanzones.forEach(sz => this.addScanZoneFromObject(sz));
  }

  toJSON() {
    let map = {
      _id: this.id,
      name: this.name,
      size: this.size,
      obstacles: [],
      scanzones: []
    };
    this.obstacles.forEach((o) => map.obstacles.push({positions: o.positions}));
    this.scanzones.forEach((sz) => {map.scanzones.push(sz);});
    return map;
  }

  addProduct(product) {
    this.products.push({
      scanzoneId: product.scanzoneId,
      _id: product._id,
      name: product.name,
      quantity: product.quantity
    })
  }

  removeProduct() {
    // TODO
  }

  addScanZone(name, x, y, z, orientation, range) {
    let sz = new ScanZone(x, y, z);
    sz.name = name;
    sz.range = range;
    sz.orientation = orientation;
    this.scanzones.push(sz);
  }

  addScanZoneFromObject(sc) {
    let sz = new ScanZone(sc.position.x, sc.position.y, sc.position.z);
    sz._id = sc._id;
    sz.name = sc.name;
    sz.range = sc.range;
    sz.orientation = sc.orientation;
    sz.products = sc.products;
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
