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
    this.defaultFlyAltitude = 1500;
    this.batteryDataset = [
      {
        name: 'Remaining',
        series: []
      }
    ];
    this.positionDataset = [
      {
        name: 'X position',
        series: []
      },
      {
        name: 'Y position',
        series: []
      },
      {
        name: 'Z position',
        series: []
      }
    ];
    if(!Date.now()) {
      Date.now = function() { return new Date().getTime(); }
    }
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

  pushAllDatasets() {
    this.pushBattery();
    this.pushPosition();
  }

  pushBattery() {
    this.batteryDataset[0].series.push({name: Date.now(), value: this.battery});
  }

  pushPosition() {
    this.positionDataset[0].series.push({name: Date.now(), value: this.position.x});
    this.positionDataset[1].series.push({name: Date.now(), value: this.position.y});
    this.positionDataset[2].series.push({name: Date.now(), value: this.position.z});
  }
}
