const mqtt = require('mqtt');
const start = 1000, paused = 115456, stop = 45546465;

class MQTTClient {
    constructor(drone) {
        this.drone = drone;
        this.status = paused;
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
                    this.drone.destination = waypoint;
                    this.drone.setXYSpeed();
                    //this.drone.flyTo(waypoint.x, waypoint.y, waypoint.z);
                }
                break;
            case 'drone/stop':
                this.status = stop;
                break;
            case 'drone/pause':
                this.status = paused;
                break;

        }
    }

    publishAllData() {
        this.drone.logPosition();
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
        if(this.status === start){
            let bool = this.drone.flyXYnew();
            if(!bool)
                this.drone.flyZnew();
        }
        else if(this.status === stop){
            this.drone.land();
        }
        else if(this.status === paused){

        }
        this.publishAllData();
    }

}

module.exports = MQTTClient;
