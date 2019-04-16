const Graaf = require('./graafImproved');
const mapsDAO = require('../database/dao/maps');

class ASter {
    constructor() {
        this.grafen = [];
        this.droneValue = 500;
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

    zoekPad(mapid, waypointsJSON) {
        this.recalculateGraaf(mapid);
        console.log('calculating path for id: ' + mapid);
        let graaf = this.grafen.find(g => g.mapId == mapid);
        let pad = [];
        try {
            pad = graaf.eigenPadMetASter(waypointsJSON);
        } catch (e) {
            throw 'fok'
        }
        console.log(pad, "PAD");
        return pad;
    };

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
}

module.exports = ASter;
