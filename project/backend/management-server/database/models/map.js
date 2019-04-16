const mongoose = require('mongoose');

let obstaclePositions = (val) => {
    return val.length === 2;
};

const coordSchema = mongoose.Schema({
    _id: false,
    x: {type: Number, required: true},
    y: {type: Number, required: true},

});

const mapSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    obstacles: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            positions:
                {type: [coordSchema], validate: [obstaclePositions, '{PATH} mag maar 2 elementen bevatten']}
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
            name: {type: String, required: false},
            orientation: {type: Number, required: true},
            range: {type: Number, required: true},
            position: coordSchema
        }
    ],
    products: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            name: {type: String, required: true},
            quantity: {type: String, required: true}
        }
    ]
});

module.exports = mongoose.model('map', mapSchema);
