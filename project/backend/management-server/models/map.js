const mongoose = require('mongoose');

const mapSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number;
    quantity: Number
    obstacles:  [{
                    x: Number,
                    y: Number
                }]
    inventoryItems: [{
                        x: Number,
                        y: Number
                    }]
})

module.exports = mongoose.model('Map', mapSchema);