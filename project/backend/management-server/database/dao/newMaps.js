const Map = require('../models/newMap');
const dijkstra = require('../../app');
const mongoose = require('mongoose');

let getAllMaps = () => {
    return Map.find().exec()
        .then(docs => {
            return Promise.resolve(docs);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let getMap = (id) => {
    return Map.findById(id).exec()
        .then(doc => {
            return Promise.resolve(doc);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let addMap = (map) => {
    const m = new Map({
        _id: new mongoose.Types.ObjectId(),
        sizeX: map.sizeX,
        sizeY: map.sizeY,
        name: map.name,
        obstacles: map.obstacles || [],
        //waypoints: map.waypoints || [],
        scanzones: map.scanzones || []
    });
    return m.save()
        .then(result => {
            dijkstra.Dijkstra.recalculateGraaf(m._id.toString());
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });

};

let updateMap = (map) => {
    const m = {
        "_id": mongoose.Types.ObjectId(map._id),
        "sizeX": map.sizeX,
        "sizeY": map.sizeY,
        "name": map.name,
        "obstacles": map.obstacles || [],
        //"waypoints": map.waypoints || [],
        "scanzones": map.scanzones || []
    };
    return Map.updateOne({_id: map._id}, {$set: m}).exec()
        .then(result => {
            dijkstra.Dijkstra.recalculateGraaf(m._id.toString());
            map.scanzones.forEach(p => addScanzone(m._id, p));
            return Promise.resolve(result);
        })
        .catch(err => {
            console.log(err);
            return Promise.reject({error: err});
        });
};

let deleteMap = (id) => {
    return Map.deleteOne({_id: id}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let getScanzone = (mapId, zoneId) => {
    return Map.findById(mapId).exec()
        .then(result => {
            let scanzone = result.scanzones.find(pr => pr._id == zoneId);
            if(scanzone)
                return Promise.resolve(scanzone);
            else
                return Promise.reject("scanzone not found");
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


let addScanzone = (mapId, scanzone) => {
    const p = {
        "_id": new mongoose.Types.ObjectId(),
        "x": scanzone.x,
        "y": scanzone.y,
        "orientation": scanzone.orientation,
        "range": scanzone.range,

        "name": scanzone.name,
        "quantity": scanzone.quantity,
        "position": scanzone.position
    };
    return Map.updateOne({_id: mapId}, {$push: {scanzones: p}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let updateScanzone = (mapId, zone) => {
    return Map.updateOne({_id: mapId, "scanzones._id": zone._id}, {$set: {"scanzones.$": zone}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


let removeScanzone = (mapId, zoneId) => {
    return Map.updateOne({_id: mapId}, {$pull: {scanzones: {_id: zoneId}}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

module.exports.getAllMaps = getAllMaps;
module.exports.getMap = getMap;
module.exports.addMap = addMap;
module.exports.updateMap = updateMap;
module.exports.deleteMap = deleteMap;
module.exports.getScanzone = getScanzone;
module.exports.addScanzone = addScanzone;
module.exports.updateScanzone = updateScanzone;
module.exports.removeScanzone = removeScanzone;
