const Graaf = require('./graaf.js');
class GraafImproved{
    constructor(map, waypoints){
        if (waypoints.constructor === Array){
            this.waypoints = waypoints;
        }
        if (map.constructor === Graaf){
            this.map = map;
        }
        this.pad = [];
    }

    berekenKortstePad(start){
        this.pad.push(start); //eerste knoop toevoegen
        let graaf = this;
        let totaleAfstand = 0;
        while (Object.keys(this.waypoints).length > 0) {
            let gekozenEindknoop;
            let afstandVanafVorigeKnoop = Infinity;
            let gekozenpad;
            this.waypoints.forEach(function (eind) {
                let testpad = graaf.map.zoekKortstePad(start, eind);
                let afstand = testpad[0];
                if (afstand < afstandVanafVorigeKnoop) { // een kleinere afstand gevonden tot 1 van de waypoints dus deze eerst bezoeken
                    gekozenEindknoop = eind;
                    afstandVanafVorigeKnoop = afstand;
                    testpad.shift(); // eerste elemant bevat de afstand tot de waypoint wat hier onbelangrijk is
                    testpad.shift(); // tweede element bevat het startelement dat overeenkomt met het vorige eindelement en moet hier dus verwijderd worden
                    gekozenpad = testpad;
                }
            });
            this.pad = this.pad.concat(gekozenpad);
            console.log(gekozenEindknoop.toString() + 'de knoop met afstand ' + afstandVanafVorigeKnoop);
            totaleAfstand += afstandVanafVorigeKnoop;
            start = gekozenEindknoop;
            delete this.waypoints[this.waypoints.indexOf(gekozenEindknoop)];
        }
        this.pad.unshift(totaleAfstand);
        return this.pad;
    }
}
module.exports = GraafImproved;