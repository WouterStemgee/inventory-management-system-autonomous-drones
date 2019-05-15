const mongoose = require('mongoose');
const Drone = require('../models/drone');

let getAllDrones = () => {
    return Drone.find().exec()
        .then(docs => {
            return Promise.resolve(docs);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let deleteAllDrones = () => {
    mongoose.connection.dropCollection('drones')
        .then(() => {
            return Promise.resolve();
        })
        .catch((err) => {
            return Promise.reject({error: err});
        });
};

let getDrone = (id) => {
    return Drone.findById(id).exec()
        .then(doc => {
            return Promise.resolve(doc);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

let addDrone = (drone) => {
    let d = new Drone({
        _id: new mongoose.Types.ObjectId(),
        name: drone.name,
        properties: drone.properties
    });

    return d.save()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });

};

let updateDrone = (droneId, drone) => {
    let d = new Drone({
        _id: droneId,
        name: drone.name,
        properties: drone.properties
    });

    return Drone.updateOne({_id: droneId}, {$set: d}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            console.log(err);
            return Promise.reject({error: err});
        });
};

let deleteDrone = (id) => {
    return Drone.deleteOne({_id: id}).exec()
        .then(result => {
            return Promise.resolve(result);
        })
        .catch(err => {
            return Promise.reject({error: err});
        });
};

module.exports.getAllDrones = getAllDrones;
module.exports.getDrone = getDrone;
module.exports.addDrone = addDrone;
module.exports.updateDrone = updateDrone;
module.exports.deleteDrone = deleteDrone;
module.exports.deleteAllDrones = deleteAllDrones;
