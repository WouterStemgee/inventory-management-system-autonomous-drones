const express = require('express');
const mqttclient = require('../MQTT/mqttclient');

const router = express.Router();

router.route('')
    .get((req, res, next) => {
        let data = req.query.data;
        //querystring met data
    });

router.route('/commands/:id')
    .post((req, res, next) => {
        req.params.id;
        //commando's doorsturen naar drone client
    });
module.exports = router;
