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
    this.obstacles = [];
    this.scanzones = [];
  }

  loadMap(map) {
    this.id = map._id;
    this.name = map.name;
    this.flightpath = new FlightPath(this.id);
    map.obstacles.forEach(o => this.addObstacle(o.positions));
    map.scanzones.forEach(sz => this.addScanZone(sz));
    console.log(this);
  }

  toJSON() {
    let map = {
      _id: this.id,
      name: this.name,
      obstacles: [],
      scanzones: []
    };
    this.obstacles.forEach((o) => map.obstacles.push({positions: o.positions}));
    this.scanzones.forEach((sz) => {map.scanzones.push(sz);});
    return map;
  }

  addProduct(product) {
    this.products.push({
      _id: product._id,
      name: product.name,
      quantity: product.quantity
    })
  }

  removeProduct() {
    // TODO
  }

  addScanZone(sc) {
    this.scanzones.push(sc);
    sc.products.forEach(pr => {
      this.products.push({
        scanzoneId: sc._id,
        _id: pr._id,
        name: pr.name,
        quantity: pr.quantity
      });
    });

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
