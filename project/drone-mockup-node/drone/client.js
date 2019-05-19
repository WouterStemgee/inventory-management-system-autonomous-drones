const mqtt = require('mqtt');
const start = 1000, paused = 115456, stop = 45546465, scanning = 64556, charging = 34542;

class MQTTClient {
    constructor(drone) {
        this.drone = drone;
        this.status = stop;
        //home locatie van de drone
        this.homebase = {
            x: 1000,
            y: 1000
        };
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
        this.client.subscribe('drone/homebase');
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
                this.status = stop;
                break;
            case 'drone/pause':
                //wordt opgeroepen aan het einde van zijn flightpath en zal stoppen indien dit boven de homebase is (dus ook landen) en zal blijven hoveren indien dit niet het geval is.
                if (this.checkHomeLand()){
                    this.status = stop;
                } else {
                    this.status = paused;
                }
                //publisch drone einde pad
                break;
            case 'drone/scanner':
                let messageObj = JSON.parse(message);
                this.status = scanning;
                this.drone.scanstatus = 0;

                console.log("Zou de rotation moeten zijn: " + messageObj.orientation);
                this.drone.scanzonedata = messageObj;
                break;
            case 'drone/homebase':
                this.homebase =  JSON.parse(message);
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
        //console.log(this.drone.destination);
        //console.log(this.status);
        if(this.status === start){
            if(this.drone.hasToLiftOff || !this.drone.position.z) {
                this.drone.flyZnew();
            }
            else
                this.drone.flyXYnew();
            this.drone.drainBattery();
        }
        else if(this.status === stop){
            this.drone.land();
            if(this.inChargeRange())
                this.status = charging;
            this.drone.hasToLiftOff = true;
        }
        else if(this.status === charging){
            this.drone.chargeBattery();
        }
        else if(this.status === paused) {
            this.drone.drainBattery();
        }
        else if(this.status === scanning) {
            this.drone.flyZnew();
            if (!this.drone.hasToLiftOff) {
                if(this.drone.scanstatus === 0)
                    this.drone.rotate();
                else if(this.drone.scanstatus === 1) {
                    this.drone.scan();
                }
                else if(this.drone.scanstatus === 2){
                    this.status = start;
                    this.drone.hasToLiftOff = true;
                    this.client.publish("drone/scanned", JSON.stringify(this.drone.scanresults));
                    console.log(this.status);
                }
            }
        }
        this.publishAllData();
    }

    inChargeRange() {
        return (Math.abs(this.drone.position.x - this.homebase.x) <= 50 && Math.abs(this.drone.position.x - this.homebase.x) <= 50 && !this.drone.position.z);
    }

    //checked of de drone zich boven zijn homebase bevindt
    //wordt opgeroepen wanneer de drone het pause commando krijgt
    //indien true => zal de drone overgaan op het stop commando en dus ook landen
    checkHomeLand() {
        return (Math.abs(this.drone.position.x - this.homebase.x) <= 50 && Math.abs(this.drone.position.x - this.homebase.x) <= 50);
    }
}

module.exports = MQTTClient;
