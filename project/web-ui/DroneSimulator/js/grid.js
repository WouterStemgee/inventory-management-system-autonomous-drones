import {Tile} from './tile.js';

export class Grid {
  constructor(grid_size, tile_size) {
    this.grid_size = grid_size;
    this.tile_size = tile_size;
    this.tiles = [...Array(grid_size)].map(()=>Array(grid_size));
    for (let x = 0; x < this.grid_size; x++){
      for(let y = 0; y < this.grid_size; y++){
        this.tiles[x][y] = new Tile(x, y, this.tile_size);
      }
    }
  }

  draw(context) {
    for (let x = 0; x < this.grid_size; x++){
      for(let y = 0; y < this.grid_size; y++){
        this.tiles[x][y].draw(context);
      }
    }
  }
}
