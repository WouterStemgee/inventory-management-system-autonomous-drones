const Graaf = require('./graafImproved');
const mapsDAO = require('../database/dao/maps');

class ASter {
    constructor() {
        this.grafen = [];
        this.droneValue;
        this.size = {x: 0, y: 0};
    }

    initializeMaps() {
        //laat bij het opstarten van de backend de verschillende mappen in en maakt een graaf voor deze mappen
        let aster = this;
        return new Promise((resolve, reject) => {
            console.log('Loading graphs...');
            mapsDAO.getAllMaps()
                .then(res => {
                    res.forEach((map, index) => {
                        aster.grafen[index] = aster.jsonMapNaarGraaf(map);
                    });
                    console.log('Graphs loaded.');
                    resolve(true);
                })
                .catch(err => {
                    reject(err);
                    console.log(err);
                });
        });
    };

    setDroneValue(droneValue) {
    //zet de drone radius in van de drone (min aftsand dat de drone zal houden tov de obstakels)
        this.droneValue = droneValue;
    }

    recalculateGraaf(mapid) {
        // Wanneer een nieuwe map toegevoegd wordt of een bestaande map aangepast werd, moet de graaf herberekend worden
        console.log('recalculating graph for id: ' + mapid);
        let aster = this;
        return new Promise((resolve, reject) => {
            mapsDAO.getMap(mapid)
                .then(res => {
                    let mapIndex = this.grafen.findIndex(g => g.mapId == mapid);
                    if (mapIndex > -1) {
                        aster.grafen[mapIndex] = aster.jsonMapNaarGraaf(res);
                    } else {
                        console.log("niet gevonden");
                        aster.grafen.push(aster.jsonMapNaarGraaf(res));
                    }
                    resolve(true);
                })
                .catch(err => {
                    reject(err);
                    console.log(err);
                });
        });
    };

    /*zoekPad(waypointsJSON) {
        let pad = [];
        try {
            pad = graaf.eigenPadMetASter(waypointsJSON);
        } catch (e) {
            throw 'fok'
        }
        console.log(pad, "PAD");
        return pad;
    };
     */

    jsonMapNaarGraaf(mapsJSON) {
        //map in JSON omzetten naar graaf
        let map = mapsJSON;
        let graaf = new Graaf();
        graaf.setMapId(map._id);
        graaf.setDroneValue(this.droneValue);
        graaf.setSize(this.size.x, this.size.y);
        let obstakels = mapsJSON.obstacles;
        obstakels.forEach(function (obstakel) {
            graaf.ObstakelWaypoints(obstakel.positions[0], obstakel.positions[1]);
        });
        return graaf;
    };

    kiesViaOpties(mapid, opties, waypointsJSON, radius, size) {
        // stelt de drone radius in en de grootte van de map, berekend vervolgens de graaf die bij deze map hoort en berekend adhv verschillende opties het pad
        // Dit kan oftewel niet gecontroleerd worden => aster == no
        // Dit kan gecontroleerd worden en dit zal een exceptie opwerpen indien het pad door of te dicht bij obstakels komt => aster == yes
        // Dit kan gecorrigeerd worden indien het pad door of te dicht bij obstakels komt => aster == correct
        // Of dit kan automatisch het kortste pad zoeken, de volgorde van de waypoints wordt dan niet behouden => aster == auto
        this.setDroneValue(radius);
        this.size = {x: size.width, y: size.height};
        this.recalculateGraaf(mapid);
        let start = waypointsJSON[0];
        if ((start.x === waypointsJSON[waypointsJSON.length - 1].x) && (start.y === waypointsJSON[waypointsJSON.length - 1].y)){
            waypointsJSON.pop();
        }
        let pad = [];
        console.log('calculating path for id: ' + mapid);
        let graaf = this.grafen.find(g => g.mapId == mapid);
        let aster = opties.aster;
        try {
            if (aster !== "auto") {
                // pad van beginpositie drone tot eerste waypoint zoeken
                pad = graaf.zoekPad(start, waypointsJSON[1]);
                pad.shift();
                pad.pop();
                waypointsJSON.shift();
            }
            if (aster === "no") {
                // niet controleren
                pad = pad.concat(waypointsJSON);
            } else if (aster === "yes") {
                // controleren
                pad = pad.concat(graaf.eigenPad(waypointsJSON));
            } else if (aster === "correct") {
                // controleren en corrigeren
                pad = pad.concat(graaf.eigenPadMetASter(waypointsJSON));
            } else if (aster === "auto") {
                // automatisch beste pad zoeken
                start = waypointsJSON.shift();
                pad = pad.concat(graaf.zoekMultiplePaden(start, waypointsJSON));
            }

            console.log("pad overleefd", pad);
            this.recalculateGraaf(mapid);
            graaf = this.grafen.find(g => g.mapId == mapid);
            let ret = opties.return;
            if (ret === "true") {
                // indien men de return optie gebruikt zal de drone terugkeren naar zijn originele begin posiite
                console.log(pad, "pad");
                let r = graaf.zoekPad(pad[pad.length - 1], start);
                r.shift();
                r.shift();
                console.log(r, "return");
                pad = pad.concat(r);
                console.log(pad, "pad + return");
            }
        } catch(e){
            throw e;
        }
        return pad;
    };
}

module.exports = ASter;
