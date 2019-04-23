const GraafWaypoints = require('../graafImproved');

let graafv2 = new GraafWaypoints();
console.time('A*');
graafv2.setDroneValue(20);
graafv2.ObstakelWaypoints({"x": 2144, "y": 1688},{"x": 16384, "y": 2464});
graafv2.ObstakelWaypoints({"x": 2144, "y": 4544},{"x": 16384, "y": 5328});
graafv2.ObstakelWaypoints({"x": 2144, "y": 7296},{"x": 16384, "y": 8112});
console.log("-------------------------------------------------------------------------------------------------");
console.log("pad")
console.log("zoek pad auto");
console.log(graafv2.zoekMultiplePaden({"x": 20, "y": 20}, [{"x": 3072, "y": 1024},{"x": 5120, "y": 1124},{"x": 8000, "y": 3000}, {"x": 10500, "y": 3100}]));
console.log("check gegeven pad (is een mogelijk pad)");
console.log(graafv2.eigenPad([{ "x": 20, "y": 20 }, { "x": 3072, "y": 1024 }, { "x": 5120, "y": 1124 },{ "x": 2124, "y": 1668 }, { "x": 2124, "y": 2484 }, { "x": 8000, "y": 3000 }, {"x": 10500, "y": 3100} ]))
//console.log(graafv2.eigenPad([{ "x": 20, "y": 20 }, { "x": 3072, "y": 1024 }, { "x": 5120, "y": 1124 }, { "x": 2124, "y": 2484 }, { "x": 8000, "y": 3000 }, { "x": 10500, "y": 3100 }]));
console.log("corrigeer eigen pad dat onmogelijk is");
console.log(graafv2.eigenPadMetCorrectie([{ "x": 20, "y": 20 }, {"x": 3072, "y": 1024},{"x": 5120, "y": 1124},{"x": 8000, "y": 3000}, {"x": 10500, "y": 3100} ]));
console.log("Correctie met ASter");
console.log(graafv2.eigenPadMetASter([{ "x": 20, "y": 20 }, {"x": 3072, "y": 1024},{"x": 5120, "y": 1124},{"x": 8000, "y": 3000}, {"x": 10500, "y": 3100} ]));
console.log("kijk twas onmogelijk => verwacht throw");
console.log(graafv2.eigenPad([{ "x": 20, "y": 20 }, {"x": 3072, "y": 1024},{"x": 5120, "y": 1124},{"x": 8000, "y": 3000}, {"x": 10500, "y": 3100} ]));

