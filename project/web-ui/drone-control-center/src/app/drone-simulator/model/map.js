import {Grid} from './grid.js';
import {FlightPath} from "./flightpath.js";
import {Product} from "./product.js";
import {Tile} from "./tile";

export class Map {

  constructor(gridSize, tileSize, imageLoader) {
    this.name = '';
    this.id = 0;
    this.gridSize = gridSize;
    this.tileSize = tileSize;
    this.grid = new Grid(gridSize, tileSize);
    this.obstacles = [];
    this.products = [];
    this.flightpath = undefined;
    this.imageLoader = imageLoader;
  }

  reset() {
    this.id = 0;
    this.name = '';
    this.flightpath = undefined;
    this.obstacles = [];
    this.products = [];
  }

  loadMap(map) {
    this.id = map._id;
    this.name = map.name;
    this.flightpath = new FlightPath(this.tileSize, this.id, {x: 1, y: 1}, {x: 1, y: 1});
    map.obstacles.forEach(o => this.addObstacle(o.x, o.y));
    map.products.forEach(p => this.addProduct(p.name, p.quantity, p.position.x, p.position.y));
  }

  toJSON(name) {
    let map = {
      _id: this.id,
      sizeX: this.gridSize.width,
      sizeY: this.gridSize.height,
      name: name,
      obstacles: [],
      products: []
    };
    this.obstacles.forEach((o) => map.obstacles.push({x: o.x, y: o.y}));
    this.products.forEach((p) => map.products.push({
        name: p.name,
        quantity: p.quantity,
        position: {x: p.x, y: p.y}
      })
    );
    return map;
  }

  addProduct(name, quantity, x, y) {
    let p = new Product(x, y, this.tileSize, this.imageLoader.loadedImages['box']);
    p.name = name;
    p.quantity = quantity;
    this.products.push(p);
  }

  removeProduct(x, y) {
    for (let i = this.products.length - 1; i >= 0; i--) {
      if (this.products[i].x === x && this.products[i].y === y) {
        this.products.splice(i, 1);
      }
    }
  }

  addObstacle(x, y) {
    this.obstacles.push(new Tile(x, y, this.tileSize, '#a80a0a'));
  }

  removeObstacle(x, y) {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      if (this.obstacles[i].x === x && this.obstacles[i].y === y) {
        this.obstacles.splice(i, 1);
      }
    }
  }

  toggleWaypoint(x, y) {
    if (this.contains('product', x, y)) {
      if (!this.contains('waypoint', x, y)) {
        this.flightpath.addWaypoint(x, y);
      } else {
        this.flightpath.removeWaypoint(x, y);
      }
    }
  }

  toggleObstacle(x, y) {
    if (!this.contains('product', x, y)) {
      if (!this.contains('obstacle', x, y)) {
        this.addObstacle(x, y);
      } else {
        this.removeObstacle(x, y);
      }
    }
  }

  toggleProduct(x, y) {
    if (!this.contains('obstacle', x, y)) {
      if (!this.contains('product', x, y)) {
        this.addProduct('Manually added', 1, x, y);
      } else {
        this.removeProduct(x, y);
      }
    }
  }

  draw(context) {
    this.grid.draw(context);
    this.flightpath.draw(context);
    this.obstacles.forEach((o) => o.draw(context));
    this.products.forEach((i) => i.draw(context));
  }

  contains(type, x, y) {
    if (type === 'obstacle') {
      return this.obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
    } else if (type === 'product') {
      return this.products.some(item => item.x === x && item.y === y);
    } else if (type === 'waypoint') {
      return this.flightpath.waypoints.some(waypoint => waypoint.x === x && waypoint.y === y);
    }
  }
}
