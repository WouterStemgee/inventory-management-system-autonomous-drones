const newMap = require('../models/newMap');
const dijkstra = require('../../app');
const mongoose = require('mongoose');

let getAllMaps = () => {
    return newMap.find().exec()
        .then(docs => {
            return Promise.resolve(docs);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let getMap = (id) => {
    return newMap.findById(id).exec()
        .then(doc => {
            return Promise.resolve(doc);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let addMap = (map) => {

    let m = new newMap({
        _id: new mongoose.Types.ObjectId(),
        name: map.name,
        obstacles: [],
        //waypoints: map.waypoints || [],
        scanzones:[],
        products: []
    });

    for(let pr of map.products){
        const p = {
            "_id": new mongoose.Types.ObjectId(),
            "quantity" : pr.quantity,
            "name": pr.name
        };
        m.products.push(p);
    }
    for(let scanzone of map.scanzones){
        const sc = {
            "_id": new mongoose.Types.ObjectId(),
            "orientation": scanzone.orientation,
            "range": scanzone.range,
            "position": scanzone.position,
            "name": scanzone.name
        };
        m.scanzones.push(sc);
    }
    for(let obstacle of map.obstacles){
        const o = {
            "_id": new mongoose.Types.ObjectId(),
            "positions": [
                obstacle.positions[0],
                obstacle.positions[1]
            ]
        };
        console.log(o);
        m.obstacles.push(o);
    }

    return m.save()
        .then(result => {
            dijkstra.Dijkstra.recalculateGraaf(m._id.toString());
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });

};

let updateMap = (mapId, map) => {
    let m = {
        "_id": mapId,
        "name": map.name,
        "obstacles": map.obstacles || [],
        //"waypoints": map.waypoints || [],
        "scanzones":[],
        "products": []
    };
    for(let pr of map.products){
        const p = {
            "_id": new mongoose.Types.ObjectId(),
            "quantity" : pr.quantity,
            "name": pr.name
        };
        m.products.push(p);
    }
    for(let scanzone of map.scanzones){
        const sc = {
            "_id": new mongoose.Types.ObjectId(),
            "orientation": scanzone.orientation,
            "range": scanzone.range,
            "position": scanzone.position,
            "name": scanzone.name
        };
        m.scanzones.push(sc);
    }
    for(let obstacle of map.obstacles){
        const o = {
            "_id": new mongoose.Types.ObjectId(),
            "positions": [
                obstacle.positions[0],
                obstacle.positions[1]
            ]
        };
        console.log(o);
        m.obstacles.push(o);
    }

    return newMap.updateOne({_id: mapId}, {$set: m}).exec()
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
    return newMap.deleteOne({_id: id}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


////////////////////////SCANZONES


let getScanzone = (mapId, zoneId) => {
    return newMap.findById(mapId).exec()
        .then(result => {
            let scanzone = result.scanzones.find(pr => pr._id == zoneId);
            if(scanzone)
                return Promise.resolve(scanzone);
            else
                return Promise.reject("scanzone not in database");
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let addScanzone = (mapId, scanzone) => {
    const p = {
        "_id": new mongoose.Types.ObjectId(),
        "orientation": scanzone.orientation,
        "range": scanzone.range,
        "position": scanzone.position,
        "name": scanzone.name
    };
    return newMap.updateOne({_id: mapId}, {$push: {scanzones: p}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let updateScanzone = (mapId, zoneId, scanzone) => {
    const sc = {
        "_id": zoneId,
        "orientation": scanzone.orientation,
        "range": scanzone.range,
        "position": scanzone.position,
        "name": scanzone.name
    };
    return newMap.updateOne({_id: mapId, "scanzones._id": zoneId}, {$set: {"scanzones.$": sc}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


let removeScanzone = (mapId, zoneId) => {
    return newMap.updateOne({_id: mapId}, {$pull: {scanzones: {_id: zoneId}}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


/////////////////////////OBSTACLES

let getObstacle = (mapId, obstacleId) => {
    return newMap.findById(mapId).exec()
        .then(result => {
            let product = result.obstacles.find(pr => pr._id == obstacleId);
            if(product)
                return Promise.resolve(product);
            else
                return Promise.reject("product not found in database");
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let addObstacle = (mapId, obst) => {
    const p = {
        "_id": new mongoose.Types.ObjectId(),
        0: obst[0],
        1: obst[1]
    };
    return newMap.updateOne({_id: mapId}, {$push: {obstacles: p}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let updateObstacle = (mapId, obstId, obst) => {
    const p = {
        "_id": obstId,
        positions: obst.positions
    }
    return newMap.updateOne({_id: mapId, "obstacles._id": obstId}, {$set: {"obstacles.$": p}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


let removeObstacle = (mapId, obstId) => {
    return newMap.updateOne({_id: mapId}, {$pull: {obstacles: {_id: obstId}}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


////////////////////////////////PRODUCTS

let getProduct = (mapId, productId) => {
    return newMap.findById(mapId).exec()
        .then(result => {
            let product = result.products.find(pr => pr._id == productId);
            if(product)
                return Promise.resolve(product);
            else
                return Promise.reject("product not found in database");
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let addProduct = (mapId, product) => {
    const p = {
        "_id": new mongoose.Types.ObjectId(),
        "name": product.name,
        "quantity" : product.quantity
    };
    return newMap.updateOne({_id: mapId}, {$push: {products: p}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let updateProduct = (mapId, productId, product) => {
    const p = {
        "_id": productId,
        "name": product.name,
        "quantity" : product.quantity
    };
    return newMap.updateOne({_id: mapId, "products._id": productId}, {$set: {"products.$": p}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


let removeProduct = (mapId, prodId) => {
    return newMap.updateOne({_id: mapId}, {$pull: {products: {_id: prodId}}}).exec()
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

module.exports.getObstacle = getObstacle;
module.exports.addObstacle = addObstacle;
module.exports.updateObstacle = updateObstacle;
module.exports.removeObstacle = removeObstacle;

module.exports.getProduct = getProduct;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
module.exports.removeProduct = removeProduct;
