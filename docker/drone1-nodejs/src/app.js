const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

require('./database/models/user');
require('./api/config/passport');

const dijkstra = require('./dijkstra/dijkstra');

const mapRouter = require('./api/maps');
const droneRouter = require('./api/drone');
const waypointRouter = require('./api/flightpath');
const userRouter = require('./api/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
app.use("/",express.static(path.join(__dirname, 'public')));

app.use('/api/maps', mapRouter);
app.use('/api/drones', droneRouter);
app.use('/api/flightpath', waypointRouter);
app.use('/api/users', userRouter);


// je hebt MongoDB lokaal geinstalleerd, indien deze nog niet bestaat wordt dit automatisch aangemaakt
mongoose.connect('mongodb://localhost/drone1', {useNewUrlParser: true});
// Production environment
// mongoose.connect('mongodb://mongo/drone1', {useNewUrlParser: true});

let Dijkstra = new dijkstra();
//Dijkstra.initializeMaps();

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;
exports.Dijkstra = Dijkstra;
