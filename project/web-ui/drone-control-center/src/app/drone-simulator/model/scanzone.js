export class ScanZone {
  constructor(x, y, z) {
    this._id = 0;
    this.position = {
      x: x,
      y: y,
      z: z
    };
    this.orientation = 0;
    this.range = 0;
    this.name = '';
    this.products = [];
  }
}
