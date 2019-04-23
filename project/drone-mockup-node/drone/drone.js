class Drone {
    constructor(posx = 1000, posy =1000, posz = 100, radius = 1) {
        this.position = {
            x: posx,
            y: posy,
            z: posz
        };
        this.destination = {
            x: posx,
            y: posy,
            z: posz
        };
        this.speed = {
            x: 100,
            y: 100,
            z: 100
        };
        this.battery = 100;
        this.radius = radius;
    }

    flyXYnew(){
        let diffX = this.destination.x - this.position.x;
        let absDiffX = Math.abs(diffX);
        if(diffX < 0 && absDiffX > this.radius){
            this.position.x -= this.speed.x * 0.05;
        }
        else if(diffX > 0 && absDiffX > this.radius) {
            this.position.x += this.speed.x * 0.05;
        }

        let diffY = this.destination.y - this.position.y;
        let absDiffY = Math.abs(diffX);
        if(diffY < 0 && absDiffY > this.radius){
            this.position.y -= this.speed.y * 0.05;
        }
        else if(diffY > 0 && absDiffY > this.radius){
            this.position.y += this.speed.y * 0.05;
        }

        return !(absDiffX < 20 && absDiffY < 20)
    }

    flyZnew(){
        let diffZ = this.destination.z - this.position.z;
        let absDiffZ = Math.abs(diffZ);
        if(diffZ < 0 && absDiffZ > this.radius){
            this.position.z -= this.speed.z * 0.05;
        }
        else if(diffZ > 0 && absDiffZ > this.radius) {
            this.position.z += this.speed.z * 0.05;
        }
    }

    setXYSpeed(){
        this.speed.x = 1;
        if (this.destination.x !== this.position.x) {
            this.speed.y = (Math.abs(this.destination.y - this.position.y) / Math.abs(this.destination.x - this.position.x)) * this.speed.x;
        } else {
            this.speed.y = 0;
        }
        let sum = this.speed.x + this.speed.y;
        this.speed.x = this.speed.x / sum * 200;
        this.speed.y = this.speed.y / sum * 200;
        this.speed.z = 100;
    }

    land(){
        this.destination = {x: this.position.x, y: this.position.y, z: 0};
    }

    logPosition(){
        this.date = new Date();
        console.log(this.date.getTime() + ' - [' + this.position.x + ', ' + this.position.y + ', ' + this.position.z + ']');
    }

    stopMoving(){
        try {
            clearInterval(this.intervalXY);
            clearInterval(this.intervalZ);
        }
        catch(err){}
    }

    stopAndLand(){
        try {
            clearInterval(this.intervalXY);
            clearInterval(this.intervalZ);
        }
        catch(err){}
        this.land();
    }

    flyTo(x, y, z) {
        this.flyZ(z);
        this.flyXY(x, y);
    }

    scan() {
        // TODO
    }

}

module.exports = Drone;
