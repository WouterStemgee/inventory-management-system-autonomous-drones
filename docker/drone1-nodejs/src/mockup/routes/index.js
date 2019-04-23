var express = require('express');
var router = express.Router();
var app = require('../app');

router.get('/', function (req, res, next) {
    res.send('Drone position: ' + JSON.stringify(app.simulation.drone.position));
});

module.exports = router;
