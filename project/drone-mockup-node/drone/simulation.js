const Drone = require('./drone');
const MQTTClient = require('./client');

class Simulation {
    constructor() {
        this.drone = new Drone();
        this.client = new MQTTClient(this.drone, this.queue);
        this.client.connect().then(() => this.start());
    }

    start() {
        let runner = setInterval(() => {
            this.client.loop();
        }, 50);
    }
}

module.exports = Simulation;
