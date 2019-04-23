const mqtt = require('mqtt');
const start = 1000, paused = 115456, stop = 45546465, scanning = 64556, landed = 1515;

class MQTTClient {
    constructor(drone) {
        this.drone = drone;
        this.status = landed;
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
            case 'drone/scanner':
                this.status = scanning;
                break;

        }
    }

    publishAllData() {
        this.drone.logPosition();
        console.log(this.drone.destination);
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
            if(this.drone.liftoff){
                this.drone.flyZnew();
            }
            else
                this.drone.flyXYnew();
        }
        else if(this.status === stop){
            this.drone.land();
            this.drone.flyZnew();
        }
        else if(this.status === paused){

        }
        else if(this.status === scanning){
            let bool = this.drone.flyZnew();
            if(bool){
                this.drone.scan();
            }
        }
        this.publishAllData();
    }

}

module.exports = MQTTClient;
