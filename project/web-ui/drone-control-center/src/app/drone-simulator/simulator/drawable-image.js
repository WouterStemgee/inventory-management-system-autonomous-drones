import { Drawable } from './drawable.js';

export class DrawableImage extends Drawable {
  constructor(x, y, tileSize, imagefile) {
    super(x, y, tileSize);
    this.imagefile = imagefile;
    this.image_loaded = false;
    this.img = new Image();
    this.img.onload = () => {
      this.image_loaded = true;
    };
    this.img.src = this.imagefile;
  }

  draw(context) {
    if (this.image_loaded) {
        context.drawImage(this.img, this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
    } else {
      this.img.onload = () => {
        this.image_loaded = true;
        context.drawImage(this.img, this.x * this.tileSize, this.y * this.tileSize);
      };
      this.img.src = this.imagefile;
    }
  }

  intersects(other) {
    return this.intersects(other);
  }
}
