import { Tile } from './tile.js';

export class Grid {
  constructor(gridSize, tileSize) {
    this.gridSize = gridSize;
    this.tiles = [...Array(gridSize.width)].map(() => Array(gridSize.height));
    for (let x = 0; x < gridSize.width; x++) {
      for(let y = 0; y < gridSize.height; y++) {
        this.tiles[x][y] = new Tile(x, y, tileSize);
      }
    }
  }

  draw(context) {
    for (let x = 0; x < this.gridSize.width; x++) {
      for(let y = 0; y < this.gridSize.height; y++) {
        this.tiles[x][y].draw(context);
      }
    }
  }
}
