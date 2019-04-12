const express = require('express');
const userRouter = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'DRONE1',
    userProperty: 'payload'
});

const ctrlProfile = require('./controllers/profile');
const ctrlAuth = require('./controllers/authentication');

// profile
userRouter.route('/profile')
    .get(auth, (req, res) => {
        ctrlProfile.profileRead(req, res)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
            });
    });

// authentication
userRouter.route('/register')
    .post((req, res) => {
        ctrlAuth.register(req, res)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
            });
    });

userRouter.route('/login')
    .post((req, res) => {
        ctrlAuth.login(req, res)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
            });
    });

module.exports = userRouter;
