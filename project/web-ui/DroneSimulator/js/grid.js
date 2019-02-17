import {Tile} from './tile.js';

export class Grid {
  constructor(gridSize, tileSize) {
    this.gridSize = gridSize;
    this.tileSize = tileSize;
    this.tiles = [...Array(gridSize)].map(()=>Array(gridSize));
    for (let x = 0; x < this.gridSize; x++){
      for(let y = 0; y < this.gridSize; y++){
        this.tiles[x][y] = new Tile(x, y, this.tileSize);
      }
    }
  }

  draw(context) {
    for (let x = 0; x < this.gridSize; x++){
      for(let y = 0; y < this.gridSize; y++){
        this.tiles[x][y].draw(context);
      }
    }
  }


}
