import { DrawableImage } from './drawable-image.js';

export class InventoryItem extends DrawableImage {
  constructor(x, y, tileSize) {
    super(x, y, tileSize, 'assets/images/simulator/box.png');
  }
}
