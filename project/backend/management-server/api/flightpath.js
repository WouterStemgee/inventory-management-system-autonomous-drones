const express = require('express');
const ASter = require('../app');

const router = express.Router();

router.route('')
    .post((req, res, next) => {
        console.log('received flightpath', req.body.waypoints, 'radius', req.body.radius);
        try {
            res.send(ASter.ASter.kiesViaOpties(req.body.mapId, req.body.options, req.body.waypoints, req.body.radius, req.body.size));
        } catch (e) {
            console.log(e);
            res.send("niet mogelijk");
        }

        // client.send(result);
    });

module.exports = router;

