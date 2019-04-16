export class Drone {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
      z: 0
    };
    this.id = 0;
    this.radius = 0;
    this.name = '';
    this.battery = 0;
    this.speed = 0;
    this.acceleration = 0;
    this.pitch = 0;
    this.roll = 0;
    this.yaw = 0;
  }

  loadDrone(drone) {
    this.id = drone._id;
    this.name = drone.name;
    this.radius = drone.properties.radius;
  }

  toJSON() {
    return {
      _id: this.id,
      name: this.name,
      properties: {
        radius: this.radius
      }
    };
  }
}
