const mqtt = require('mqtt');
const start = 1000, paused = 115456, stop = 45546465;

class MQTTClient {
    constructor(drone) {
        this.drone = drone;
        this.status = stop;
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
                console.log(topic, this.status);
                this.handleMessage(topic, message);
            });
        }).then(res => {
            //this.loop();
        });
    }

    initSubscriptions() {
        this.client.subscribe('drone/moveto');
        this.client.subscribe('drone/start');
        this.client.subscribe('drone/pause');
        this.client.subscribe('drone/stop');
    }

    handleMessage(topic, message) {
        switch (topic) {
            case 'drone/start':
                this.status = start;
                break;
            case 'drone/moveto':
                const waypoint = JSON.parse(message);
                if(this.status === start){
                    this.drone.flyTo(waypoint.x, waypoint.y, waypoint.z);
                }
                break;
            case 'drone/stop':
                this.status = stop;
                this.drone.stopAndLand();
                break;
            case 'drone/pause':
                this.status = paused;
                this.drone.stopMoving();
                break;

        }
    }

    publishAllData() {
        this.drone.logPosition()
        this.publishPosition();
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

    loop(){
        let interval = setInterval( () => {
            this.publishAllData();
        }, 50);
    }

}

module.exports = MQTTClient;