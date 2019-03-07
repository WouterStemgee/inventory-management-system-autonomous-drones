const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const dijkstra = require('./dijkstra/dijkstra');

const mapRouter = require('./api/maps');
const droneRouter = require('./api/drone');
const waypointRouter = require('./api/flightpath');

const app = express();

// CORS om vanuit angular lokaal toegang te krijgen naar express
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/maps', mapRouter);
app.use('/api/drone', droneRouter);
app.use('/api/flightpath', waypointRouter);

//route voor statische context -> node-red, mss niet meer nodig door de vorige call met directory name
//app.use("/node-red",express.static("public"));


// je hebt MongoDB lokaal geinstalleerd, indien deze nog niet bestaat wordt dit automatisch aangemaakt
mongoose.connect('mongodb://localhost/drone1', {useNewUrlParser: true});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

let Dijkstra = new dijkstra();
Dijkstra.initializeMaps();

module.exports = app;
exports.Dijkstra = Dijkstra;
