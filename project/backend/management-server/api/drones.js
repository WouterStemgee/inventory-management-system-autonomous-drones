const express = require('express');
const droneDAO = require('../database/dao/drones');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        droneDAO.getAllDrones()
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
            });
    })
    .post((req, res) => {
        droneDAO.addDrone(req.body)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
                console.log(error);

            });
    });

router.route('/:droneId')
    .get((req, res) => {
        droneDAO.getDrone(req.params.droneId)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
            });
    })
    .put((req, res) => {
        droneDAO.updateDrone(req.params.droneId, req.body)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
            });

    })
    .delete((req, res) => {
        droneDAO.deleteDrone(req.params.droneId)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
            });
    });

module.exports = router;
