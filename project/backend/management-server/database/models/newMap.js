const mongoose = require('mongoose');

const coordSchema = mongoose.Schema({
    _id: false,
    x: {type: Number, required: true},
    y: {type: Number, required: true},

});

const mapSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sizeX: {type: Number, required: true},
    sizeY: {type: Number, required: true},
    name: {type: String, required: true},
    obstacles: [
        {
            0: coordSchema,
            1: coordSchema
        }
    ],
    /*waypoints: [
        {
            position: coordSchema,
            isScanzone: {type: Boolean, required: false}
        }
    ],*/
    scanzones: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            x: {type: Number, required: true},
            y: {type: Number, required: true},
            orientation: {type: Number, required: true},
            range: {type: Number, required: true},

            name: {type: String, required: true},
            quantity: {type: Number, required: true},
            position: coordSchema
        }
    ]
});

module.exports = mongoose.model('Map', mapSchema);
