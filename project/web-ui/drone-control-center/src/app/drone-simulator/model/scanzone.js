export class ScanZone {
  constructor(x, y, z) {
    this.position = {
      x: x,
      y: y,
      z: z
    };
    this.orientation = 0;
    this.range = 0;
    this.name = '';
  }
}
