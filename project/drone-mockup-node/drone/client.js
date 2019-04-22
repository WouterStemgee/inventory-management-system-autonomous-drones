const mqtt = require('mqtt');

class MQTTClient {
    constructor(drone) {
        this.drone = drone;
    }

    connect() {
        return new Promise((resolve) => {
            this.client = mqtt.connect('mqtt://localhost:1883');
            this.client.on('connect', () => {
                console.log('Connected to broker');
                this.initSubscriptions();
                resolve();
            });
            this.client.on('message', (topic, message) => {
                console.log('Message received');
                this.handleMessage(topic, message);
            });
        });
    }

    initSubscriptions() {
        this.client.subscribe('drone/moveto');
    }

    handleMessage(topic, message) {
        switch (topic) {
            case 'drone/moveto':
                const waypoint = JSON.parse(message);
                this.drone.flyTo(waypoint.x, waypoint.y, waypoint.z);
                break;
        }
    }

    publishAllData() {
        // TODO
    }

    publishPosition() {
        const pos = {
            x: this.drone.position.x,
            y: this.drone.position.y,
            z: this.drone.position.z
        };
        this.client.publish('drone/position', JSON.stringify(pos));
    }

}

module.exports = MQTTClient;