class Drone {
    constructor() {
        this.position = {
            x: 1000,
            y: 1000,
            z: 0
        };
        this.speed = {
            x: 0,
            y: 0,
            z: 0
        };
        this.battery = 100;
    }

    flyXY(x, y) {
        console.log('======================== FlyXY ========================');
        if (this.speed.x === 0) {
            this.speed.x = 100;
        }
        if (x !== this.position.x) {
            this.speed.y = (Math.abs(y - this.position.y) / Math.abs(x - this.position.x)) * this.speed.x;
        } else {
            this.speed.y = 0;
        }
        this.speed.z = 0;

        let t = 0;
        let time = (Math.abs(x - this.position.x) / this.speed.x);
        let initX = this.position.x;
        let initY = this.position.y;

        let interval = setInterval(() => {
            if (t <= time) {
                if (x > initX && y > initY) {
                    this.position.x = initX + (this.speed.x * t);
                    this.position.y = initY + (this.speed.y * t);
                } else if (x < initX && y > initY) {
                    this.position.x = initX - (this.speed.x * t);
                    this.position.y = initY + (this.speed.y * t);
                }
                else if (x > initX && y < initY) {
                    this.position.x = initX + (this.speed.x * t);
                    this.position.y = initY - (this.speed.y * t);
                }

                else if (x < initX && y < initY) {
                    this.position.x = initX - (this.speed.x * t);
                    this.position.y = initY - (this.speed.y * t);
                }
                else if (x === initX) {
                    if (y < initY) {
                        this.position.y = initY - (this.speed.y * t);
                    } else if (y > initY) {
                        this.position.y = initY + (this.speed.y * t);
                    }
                } else if (y === initY) {
                    if (x < initX) {
                        this.position.x = initX - (this.speed.x * t)
                    }
                    else if (x > initX) {
                        this.position.x = initX + (this.speed.x * t)
                    }
                }
                this.date = new Date();
                console.log(this.date.getTime() + ' - [' + this.position.x + ', ' + this.position.y + ', ' + this.position.z + ']');
                t += 0.05;
            } else {
                clearInterval(interval);
                this.position.x = x;
                this.position.y = y;
                this.speed.x = 0;
                this.speed.y = 0;
                this.date = new Date();
                console.log(this.date.getTime() + ' - [' + this.position.x + ', ' + this.position.y + ', ' + this.position.z + ']');
            }
        }, 50);
    }

    flyZ(z) {
        console.log('======================== FlyZ ========================');
        if (z !== this.position.z) {
            if (this.speed.z === 0) {
                this.speed.z = 100;
            }
            let t = 0;
            let initZ = this.position.z;
            let interval = setInterval(() => {
                if (Math.round(this.position.z) !== z) {
                    if (z > this.position.z) {
                        this.position.z = initZ + this.speed.z * t;
                    }
                    else if (z < this.position.z) {
                        this.position.z = initZ - this.speed.z * t;
                    }
                    this.date = new Date();
                    console.log(this.date.getTime() + ' - [' + this.position.x + ', ' + this.position.y + ', ' + this.position.z + ']');
                    t += 0.05;
                } else {
                    clearInterval(interval);
                    this.speed.z = 0;
                    this.date = new Date();
                    console.log(this.date.getTime() + ' - [' + this.position.x + ', ' + this.position.y + ', ' + this.position.z + ']');
                }
            }, 50);
        }
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