import {Drawable} from './drawable.js';

export class Tile extends Drawable {
  constructor(x, y, tile_size) {
    super(x, y, tile_size, tile_size);
    this.tile_size = tile_size;
    this.color = '#686868';
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.tile_size , this.y * this.tile_size, this.tile_size , this.tile_size);
    ctx.strokeRect(this.x * this.tile_size , this.y * this.tile_size, this.tile_size , this.tile_size);
  }
}
