const Map = require('../models/map');
const ASter = require('../../app');
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

let deleteAllMaps = () => {
    mongoose.connection.dropCollection('maps')
        .then(() => {
            return Promise.resolve();
        })
        .catch((err) => {
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

    let m = new Map({
        _id: new mongoose.Types.ObjectId(),
        name: map.name,
        size: {width: map.size.width, height: map.size.height},
        obstacles: [],
        scanzones: [],
    });

    for (let scanzone of map.scanzones) {
        const sc = {
            "_id": new mongoose.Types.ObjectId(),
            "orientation": scanzone.orientation,
            "range": scanzone.range,
            "position": scanzone.position,
            "name": scanzone.name,
            "products": []
        };
        if(scanzone.products !== undefined)
            for (let pr of scanzone.products) {
                const p = {
                    "_id": new mongoose.Types.ObjectId(),
                    "quantity": pr.quantity,
                    "name": pr.name
                };
                sc.products.push(p);
            }
        m.scanzones.push(sc);
    }
    for (let obstacle of map.obstacles) {
        const o = {
            "_id": new mongoose.Types.ObjectId(),
            "positions": [
                obstacle.positions[0],
                obstacle.positions[1]
            ]
        };
        m.obstacles.push(o);
    }

    return m.save()
        .then(result => {
            ASter.ASter.recalculateGraaf(m._id.toString());
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
        "obstacles": [],
        "scanzones": []
    };
    for (let scanzone of map.scanzones) {
        const sc = {
            "_id": scanzone._id,
            "orientation": scanzone.orientation,
            "range": scanzone.range,
            "position": scanzone.position,
            "name": scanzone.name,
            "products":[]
        };
        if(scanzone.products !== undefined)
            for (let pr of scanzone.products) {
                const p = {
                    "_id": pr._id,
                    "quantity": pr.quantity,
                    "name": pr.name
                };
                sc.products.push(p);
            }
        m.scanzones.push(sc);
    }

    for (let obstacle of map.obstacles) {
        const o = {
            "_id": new mongoose.Types.ObjectId(),
            "positions": obstacle.positions
        };
        m.obstacles.push(o);
    }

    return Map.updateOne({_id: mapId}, {$set: m}).exec()
        .then(result => {
            ASter.ASter.recalculateGraaf(m._id.toString());
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


////////////////////////SCANZONES


let getScanzone = (mapId, zoneId) => {
    return Map.findById(mapId).exec()
        .then(result => {

            let scanzone = result.scanzones.find(pr => pr._id == zoneId);
            if (scanzone)
                return Promise.resolve(scanzone);
            else
                return Promise.reject("scanzone not in database");
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let addScanzone = (mapId, scanzone) => {
    const sc = {
        "_id": new mongoose.Types.ObjectId(),
        "orientation": scanzone.orientation,
        "range": scanzone.range,
        "position": scanzone.position,
        "name": scanzone.name,
        "products": []
    };
    if(scanzone.products !== undefined)
        for (let pr of scanzone.products) {
            const p = {
                "_id": new mongoose.Types.ObjectId(),
                "quantity": pr.quantity,
                "name": pr.name
            };
            sc.products.push(p);
        }
    return Map.updateOne({_id: mapId}, {$push: {scanzones: sc}}).exec()
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
        "name": scanzone.name,
        "products": []
    };
    if(scanzone.products !== undefined)
        for (let pr of scanzone.products) {
            const p = {
                "_id": scanzone._id,
                "quantity": pr.quantity,
                "name": pr.name
            };
            sc.products.push(p);
        }
    return Map.updateOne({_id: mapId, "scanzones._id": zoneId}, {$set: {"scanzones.$": sc}}).exec()
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


/////////////////////////OBSTACLES

let getObstacle = (mapId, obstacleId) => {
    return Map.findById(mapId).exec()
        .then(result => {
            let product = result.obstacles.find(pr => pr._id == obstacleId);
            if (product)
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
    return Map.updateOne({_id: mapId}, {$push: {obstacles: p}}).exec()
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
    };
    return Map.updateOne({_id: mapId, "obstacles._id": obstId}, {$set: {"obstacles.$": p}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


let removeObstacle = (mapId, obstId) => {
    return Map.updateOne({_id: mapId}, {$pull: {obstacles: {_id: obstId}}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


////////////////////////////////PRODUCTS

let getProduct = (mapId, scanzoneId, productId) => {
    return Map.findById(mapId).exec()
        .then(result => {
            let scanzone = result.scanzones.find(sc => sc._id == scanzoneId);
            if (scanzone){
                let product = scanzone.products.find(p => p._id == productId);
                if(product)
                    return Promise.resolve(product);
                else
                    return Promise.reject("product not found in database");
            }
            else
                return Promise.reject("scanzone not found in database");
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let addProduct = (mapId, scanzoneId, product) => {
    const p = {
        "_id": new mongoose.Types.ObjectId(),
        "name": product.name,
        "quantity": product.quantity
    };
    return Map.updateOne({_id: mapId, "scanzones._id": scanzoneId}, {$push: {"scanzones.$.products": p}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let updateProduct = (mapId, scanzoneId, productId, product) => {
    const p = {
        "_id": productId,
        "name": product.name,
        "quantity": product.quantity
    };
    // in mongodb is het niet mogelijk om dubbel geneste dingen zomaar aan te passen, dus is dit een workaround
    return getScanzone(mapId, scanzoneId).then(res => {
        let index = res.products.findIndex(p => p._id == productId);
        if(index !== -1){
            res.products[index] = p;
            Map.updateOne({_id: mapId, "scanzones._id": scanzoneId}, {$set: {"scanzones.$": res}}).exec()
                .then(result => {
                    return Promise.resolve(result);
                })
                .catch(err => {
                    return Promise.reject({error: err});
                });
        }
        else{
            return Promise.reject("product not found in the scanzone");
        }
    }).catch(err => {
        return Promise.reject({error: err});
    });
};


let removeProduct = (mapId, scanzoneId, prodId) => {
    return Map.updateOne({_id: mapId, "scanzones._id": scanzoneId}, {$pull: {"scanzones.$.products": {_id: prodId}}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let getAllProducts = (mapId) => {
    //return alle products, met een extra scanzoneId per product
    return Map.findById(mapId).exec().then( res => {
        let obj = [];
        for(let sc of res.scanzones){
            for(let pr of sc.products){
                let p = {
                    scanzoneId: sc._id,
                    name: pr.name,
                    quantity: pr.quantity,
                    _id: pr._id
                }
                obj.push(p);
            }
        }
        return Promise.resolve(obj);
    }).catch(err => {
        return Promise.reject({error: err});
    });
};

module.exports.getAllMaps = getAllMaps;
module.exports.deleteAllMaps = deleteAllMaps;
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

module.exports.getAllProducts = getAllProducts;
