import {Tile} from './tile.js';

export class Waypoint extends Tile {
  constructor(x, y, tileSize) {
    super(x, y, tileSize, '#699868');
  }
}
