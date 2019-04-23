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
        this.client.subscribe('drone/scanner');
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
                }
                break;
            case 'drone/stop':
                this.drone.land();
                this.status = stop;
                break;
            case 'drone/pause':
                this.status = paused;
                break;
            case 'drone/scanner':
                this.status = scanning;
                this.drone.scanstatus = 0;
                console.log("Zou de rotation moeten zijn: " + message);
                this.drone.scanrotation = message;
                break;

        }
    }

    publishAllData() {
        //this.drone.logPosition();
        //console.log(this.drone.destination);
        this.publishPosition();
        this.publishBattery();
        this.publishOrientation();
        // TODO
    }

    publishBattery() {
        this.client.publish('drone/battery', JSON.stringify(this.drone.battery));
    }

    publishPosition() {
        const pos = {
            x: this.drone.position.x,
            y: this.drone.position.y,
            z: this.drone.position.z
        };
        this.client.publish('drone/position', JSON.stringify(pos));
    }

    publishOrientation() {
        this.client.publish('drone/orientation', JSON.stringify(this.drone.rotation));
    }

    loop(){
        if(this.status === start){
            if(this.drone.liftoff)
                this.drone.flyZnew();
            else
                this.drone.flyXYnew();
            this.drone.drainBattery();
        }
        else if(this.status === stop){
            this.drone.flyZnew();
            if(this.drone.position.z < 10)
                this.drone.liftoff = true;

        }
        else if(this.status === paused){

        }
        else if(this.status === scanning) {
            let bool = this.drone.flyZnew();
            if (bool) {
                if(this.drone.scanstatus === 0)
                    this.drone.rotate();
                else if(this.drone.scanstatus === 1) {
                    this.drone.scan();
                    this.client.publish('drone/scanned',JSON.stringify({
                        name: "badeendjes2",
                        quantity: 500
                    }));
                }
                else if(this.drone.scanstatus === 2)
                    this.status = start;
            }
        }
        this.publishAllData();
    }

}

module.exports = MQTTClient;
