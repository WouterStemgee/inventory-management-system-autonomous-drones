import { Grid } from './grid.js';
import { FlightPath } from "./flightpath.js";
import { InventoryItem } from "./inventory-item.js";
import { Obstacle } from "./obstacle.js";

export class Map {

  constructor(gridSize, tileSize) {
    this.name = '';
    this.id = undefined;
    this.gridSize = gridSize;
    this.tileSize = tileSize;
    this.grid = new Grid(gridSize, tileSize);
    this.obstacles = [];
    this.inventoryItems = [];
    this.flightpath = new FlightPath(tileSize);
    this.optimalFlightPath = undefined;
  }

  reset() {
    this.obstacles = [];
    this.inventoryItems = [];
    this.flightpath.waypoints = [];
  }

  loadMap(map) {
    this.reset();
    this.id = map.id;
    this.name = map.name;
    map.obstacles.forEach(o => this.addObstacle(o.x, o.y));
    map.inventoryItems.forEach(i => this.addInventoryItem(i.x, i.y));
    console.log('Loaded map: ', map);
  }

  saveMap(url) {
    // TODO: Save Map JSON-file to the back-end with obstacles and inventory items
  }

  addInventoryItem(x, y) {
    this.inventoryItems.push(new InventoryItem(x,y,this.tileSize));
  }

  addObstacle(x, y) {
    this.obstacles.push(new Obstacle(x,y,this.tileSize));
  }

  toggleWaypoint(x, y) {
    if (this.contains('inventoryItem', x, y)) {
      if (!this.contains('waypoint', x, y)) {
        this.flightpath.addWaypoint(x, y);
      } else {
        this.flightpath.removeWaypoint(x, y);
      }
    }
  }

  draw(context) {
    this.grid.draw(context);
    this.flightpath.draw(context);
    this.obstacles.forEach((o) => o.draw(context));
    this.inventoryItems.forEach((i) => i.draw(context));
  }

  contains(type, x, y) {
    if (type === 'obstacle') {
      return this.obstacles.some(obstacle => obstacle.x === x  && obstacle.y === y);
    } else if (type === 'inventoryItem') {
      return this.inventoryItems.some(item => item.x === x  && item.y === y);
    } else if (type === 'waypoint') {
      return this.flightpath.waypoints.some(waypoint => waypoint.x === x  && waypoint.y === y);
    }
  }
}
