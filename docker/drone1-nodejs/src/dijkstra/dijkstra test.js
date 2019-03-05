const Dijkstra = require('./dijkstra');
var hrstart = process.hrtime();
let dijkstra = new Dijkstra();
dijkstra.initializeMaps().then(function(){
    let waypointsJSON = [{"x": 1,"y": 1},{"x": 5,"y": 5},{"x": 2,"y": 5},{"x": 2,"y": 2},{"x": 5,"y": 7},{"x": 9,"y": 28}];
    console.log(dijkstra.zoekPad(0, waypointsJSON));
    var hrend = process.hrtime(hrstart)
    console.log('dees duurde ' + hrend[0]/ 1000000 + 'ms - ' + hrend[1]/ 1000000 + 'ms');
});

