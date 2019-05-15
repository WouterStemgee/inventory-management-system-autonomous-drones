class Knoop {
    // klasse die de knopen en nodige informatie voor het algoritme bijhoudt
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bezocht = false;
        this.afstand = Infinity;
        this.vorige = null;
    }
}

module.exports = Knoop;
