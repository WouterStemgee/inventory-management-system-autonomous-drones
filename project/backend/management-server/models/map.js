const mongoose = require('mongoose');

const coordSchema = mongoose.Schema({
    _id: false,
    x: Number,
    y: Number
});

const mapSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    quantity: Number,
    sizeX: Number,
    sizeY: Number,
    obstacles:  [coordSchema],
    inventoryItems: [coordSchema]
})

module.exports = mongoose.model('Map', mapSchema);