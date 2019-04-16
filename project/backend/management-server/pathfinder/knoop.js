class Knoop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bezocht = false;
        this.afstand = Infinity;
        this.vorige = null;
    }
}

module.exports = Knoop;
