const mongoose = require('mongoose');

const droneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    properties: {radius: {type: Number, required: true}}

});

module.exports = mongoose.model('drone', droneSchema);
