import {DrawableImage} from './drawable-image.js';

export class InventoryItem extends DrawableImage {
  constructor(x, y, tileSize, loadedImage) {
    super(x, y, tileSize, loadedImage);
    this.name = '';
    this.amount = '';
  }
}
