const Map = require('../models/map');
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
        obstacles: map.obstacles,
        products: map.products
    });
    return m.save()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });

};

let updateMap = (map) => {
    const m = {
        "_id": mongoose.Types.ObjectId(map.id),
        "sizeX": map.sizeX,
        "sizeY": map.sizeY,
        "name": map.name,
        "obstacles": map.obstacles,
        "products": []
    };
    return Map.updateOne({_id: map.id}, {$set: m}).exec()
        .then(result => {
            map.products.forEach(p => addProduct(m._id, p));
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

let addProduct = (mapId, product) => {
    const p = {
        "_id": new mongoose.Types.ObjectId(),
        "name": product.name,
        "quantity": product.quantity,
        "position": {
            x: product.position.x,
            y: product.position.y
        }
    };
    return Map.updateOne({_id: mapId}, {$push: {products: p}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let updateProduct = (mapId, product) => {
    return Map.updateOne({_id: mapId}, {"products._id": product._id}, {$set: {"products.$": product}}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};


let removeProduct = (mapId, productId) => {
    return Map.updateOne({_id: mapId}, {$pull: {products: {_id: productId}}}).exec()
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
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
module.exports.removeProduct = removeProduct;
