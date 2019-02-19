import { Tile } from './tile.js';

export class Obstacle extends Tile {
  constructor(x, y, tileSize) {
    super(x, y, tileSize, '#a80a0a');
  }
}
