const Graaf = require('./graafImproved');
const mapsDAO = require('../database/dao/maps');

class ASter {
    constructor() {
        this.grafen = [];
        this.droneValue;
    }

    initializeMaps() {
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
        //graaf.setSize(map.sizeX, map.sizeY);
        let obstakels = mapsJSON.obstacles;
        obstakels.forEach(function (obstakel) {
            graaf.ObstakelWaypoints(obstakel.positions[0], obstakel.positions[1]);
        });
        return graaf;
    };

    kiesViaOpties(mapid, opties, waypointsJSON, radius, size){
        this.setDroneValue(radius);
        this.recalculateGraaf(mapid);
        let start = waypointsJSON[0];
        if ((start.x === waypointsJSON[waypointsJSON.length - 1].x) && (start.y === waypointsJSON[waypointsJSON.length - 1].y)){
            waypointsJSON.pop();
        }
        let pad = [];
        console.log('calculating path for id: ' + mapid);
        let graaf = this.grafen.find(g => g.mapId == mapid);
        graaf.setSize(size.width, size.height);
        let aster = opties.aster;
        try {
            if (aster !== "auto") {
                pad = graaf.zoekPad(start, waypointsJSON[1]);
                pad.shift();
                pad.pop();
                waypointsJSON.shift();
                console.log("yeet")
            }
            if (aster === "no") {
                pad = pad.concat(waypointsJSON);
            } else if (aster === "yes") {
                pad = pad.concat(graaf.eigenPad(waypointsJSON));
            } else if (aster === "correct") {
                pad = pad.concat(graaf.eigenPadMetASter(waypointsJSON));
            } else if (aster === "auto") {
                start = waypointsJSON.shift();
                pad = pad.concat(graaf.zoekMultiplePaden(start, waypointsJSON));
            }

            console.log("pad overleefd", pad);
            this.recalculateGraaf(mapid);
            graaf = this.grafen.find(g => g.mapId == mapid);
            let ret = opties.return;
            if (ret === "true") {
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
