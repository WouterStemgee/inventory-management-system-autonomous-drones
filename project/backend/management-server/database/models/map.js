const mongoose = require('mongoose');
const coordSchema = mongoose.Schema({
    _id: false,
    x: {type: Number, required: true},
    y: {type: Number, required: true}
});

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    position: coordSchema
});

const mapSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sizeX: {type: Number, required: true},
    sizeY: {type: Number, required: true},
    name: {type: String, required: true},
    obstacles: [coordSchema],
    products: [productSchema]
});

module.exports = mongoose.model('Map', mapSchema);