const express = require('express');
const droneDAO = require('../database/dao/drones');
const Collision = require('../pathfinder/collision');
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
    })
    .delete((req, res) => {
        droneDAO.deleteAllDrones()
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
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

router.route('/collision')
    .post((req, res, next) => {
        //stuurt de korste afstand van de drone tot de rand van het dichtste object terug
        let afstand = Infinity;
        let dronePos = req.body.dronePos;
        let lijnen = req.body.lijnen;
        console.log(dronePos, lijnen, "yeet");
        for (let lijn of lijnen){
            let temp = Collision(dronePos[0], dronePos[[1]], lijn[0], lijn[1], lijn[2], lijn[3]);
            if (afstand > temp){
                afstand = temp;
            }
        }
        console.log(afstand,"afstand");
        res.send(afstand)
        // client.send(result);
    });

module.exports = router;
