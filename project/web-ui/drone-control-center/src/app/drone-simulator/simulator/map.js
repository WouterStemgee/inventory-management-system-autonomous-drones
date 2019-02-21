import { Grid } from './grid.js';
import { FlightPath } from "./flightpath.js";
import { InventoryItem } from "./inventory-item.js";
import { Obstacle } from "./obstacle.js";

export class Map {
  //mapAPI = 'https://localhost:port/api/map/';

  constructor(gridSize, tileSize) {
    this.name = '';
    this.gridSize = gridSize;
    this.tileSize = tileSize;
    this.grid = new Grid(gridSize, tileSize);
    this.obstacles = [];
    this.inventoryItems = [];
    this.flightpath = new FlightPath(tileSize);
    this.optimalFlightPath = undefined;
    this.loadMap('');
  }

  loadMap(url) {
    // TODO: Load Map JSON-file from the back-end with obstacles and inventory items
    this.name = 'Test Map 1';
    this.addInventoryItems();
    this.addObstacles();
  }

  saveMap(url) {
    // TODO: Save Map JSON-file to the back-end with obstacles and inventory items
  }

  addInventoryItems() {
    this.inventoryItems.push(new InventoryItem(10,10,this.tileSize));
    this.inventoryItems.push(new InventoryItem(5,2,this.tileSize));
    this.inventoryItems.push(new InventoryItem(12,8,this.tileSize));
    this.inventoryItems.push(new InventoryItem(14,18,this.tileSize));
  }

  addObstacles() {
    this.obstacles.push(new Obstacle(15,15,this.tileSize));
  }

  draw(context) {
    this.grid.draw(context);
    this.flightpath.draw(context);
    this.obstacles.forEach((o) => o.draw(context));
    this.inventoryItems.forEach((i) => i.draw(context));

  }
}
