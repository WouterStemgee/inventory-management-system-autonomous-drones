const GraafWaypoints = require('../graafImproved');

let graafv2 = new GraafWaypoints();
console.time('A*');
graafv2.setDroneValue(1);
graafv2.ObstakelWaypoints({"x": 2144, "y": 1688}, {"x": 16384, "y": 2464});
graafv2.ObstakelWaypoints({"x": 2144, "y": 4544}, {"x": 16384, "y": 5328});
graafv2.ObstakelWaypoints({"x": 2144, "y": 7296}, {"x": 16384, "y": 8112});
console.log("-------------------------------------------------------------------------------------------------");
console.log("pad")
console.log(graafv2.zoekMultiplePaden({"x": 1067, "y": 1237}, [{"x": 1280, "y": 9842}, {"x": 18166, "y": 3193}, {"x": 29044, "y": 10091}, {"x": 29187, "y": 633}]));
//console.log(graafv2.eigenPad([{"x": 1067, "y": 1237}, {"x": 1280, "y": 9842}, {"x": 18166, "y": 3193}, {"x": 29044, "y": 10091}, {"x": 29187, "y": 633}]));
//console.log(graafv2.eigenPadMetCorrectie([{"x": 1067, "y": 1237}, {"x": 1280, "y": 9842}, {"x": 18166, "y": 3193}, {"x": 29044, "y": 10091}, {"x": 29187, "y": 633}]));
console.log(graafv2.eigenPadMetASter([{"x": 1067, "y": 1237}, {"x": 1280, "y": 9842}, {"x": 18166, "y": 3193}, {"x": 29044, "y": 10091}, {"x": 29187, "y": 633}]));
