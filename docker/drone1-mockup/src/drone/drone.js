class Drone {
    constructor(posx = 1000, posy =1000, posz = 0, radius = 12) {
        this.standardZ = posz;

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
            x: 0,
            y: 0,
            z: 0
        };
        this.battery = 100;
        this.radius = radius;
        this.hasToLiftOff = true;
        this.rotation = 0;
        this.scanstatus = 0;
        this.scanzonedata = null;
        this.scanresults = null;
        this.namen = ["badeentjes", "sleutelhangers", "potjes", "glaasjes", "drones", "zakdoeken", "drones",
            "muizen", "computers", "crapple", "crapple", "crapple", "robbe's", "sinaasappelen", "peren", "lichi's"];
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    drainBattery() {
        if(this.battery > 0) {
            if (this.getRandomInt(2) === 1)
                this.battery -= 0.01;
        }
    }

    chargeBattery() {
        if(this.battery < 100)
            this.battery += 0.01;
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
        let absDiffY = Math.abs(diffY);
        if(diffY < 0 && absDiffY > this.radius){
            this.position.y -= this.speed.y * 0.05;
        }
        else if(diffY > 0 && absDiffY > this.radius){
            this.position.y += this.speed.y * 0.05;
        }
    }

    flyZnew(){
        this.speed.z = 100;
        let diffZ = this.destination.z - this.position.z;
        let absDiffZ = Math.abs(diffZ);
        if(diffZ < 0 && absDiffZ > 0){
            this.position.z -= this.speed.z * 0.05;
        }
        else if(diffZ > 0 && absDiffZ > 0) {
            this.position.z += this.speed.z * 0.05;
        }
        this.hasToLiftOff = absDiffZ > 0;
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
        this.speed.z = 0;
    }

    land(){
        this.destination = {x: this.position.x, y: this.position.y, z: 0};
        this.speed.z = 100;
        this.flyZnew();
    }

    logPosition(){
        this.date = new Date();
        console.log(this.date.getTime() + ' - [' + this.position.x + ', ' + this.position.y + ', ' + this.position.z + ']');
    }

    rotate() {
        if(this.rotation < this.scanzonedata.orientation)
            this.rotation++;
        else if(this.rotation > this.scanzonedata.orientation)
            this.rotation--;
        else {
            this.scanstatus = 1;
        }
        //console.log(this.rotation);
    }

    scan() {
        console.log(this.scanzonedata);
        let post = false;
        let product;
        if(this.scanzonedata.products.length !== 0 && (this.scanzonedata.products.length  > 5 || this.getRandomInt(3) === 0 ) ){
            product = this.scanzonedata.products[this.getRandomInt(this.scanzonedata.products.length)];
            product.quantity = this.getRandomInt(500);
        }
        else{
            post = true;
            product = {
                _id: 0,
                name: this.namen[this.getRandomInt(this.namen.length)],
                quantity: this.getRandomInt(500)
            }
        }

        this.scanresults = {
            scanzoneId: this.scanzonedata._id,
            post: post,
            product: product
        };

        //console.log(this.scanresults);
        console.log("SCANNED");
        this.scanstatus = 2;
    }
}

module.exports = Drone;
