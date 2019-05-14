const mongoose = require('mongoose');

const coordSchema = mongoose.Schema({
    _id: false,
    x: {type: Number, required: true},
    y: {type: Number, required: true}
});

const droneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    properties: {
        radius: {type: Number, required: true},
        homebase: coordSchema,
        maxbattery: Number,
        batteryusage: Number
    }

});

module.exports = mongoose.model('drone', droneSchema);
