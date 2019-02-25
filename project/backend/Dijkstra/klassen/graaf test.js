const Graaf = require('./graaf');
const Slow = require('./graaf zonder priority queue');
let graaf = new Graaf();
let slow = new Slow();
graaf.maakGrid(10,10);
slow.maakGrid(10,10);
console.log(graaf.zoekKortstePadWaypoints('0X0Y', ['5X5Y','5X7Y','7X7Y']));
console.log(slow.zoekKortstePadWaypoints('0X0Y', ['5X5Y','5X7Y','7X7Y']));
console.log('---------------------------------------------------verwijderen van knopen uit de gewone graaf--------------------------------------------------------------------------');
graaf.verwijderKnopen(['3X3Y','3X2Y','3X4Y']);
slow.verwijderKnopen(['3X3Y','3X2Y','3X4Y']);
console.log(graaf.zoekKortstePadWaypoints('0X0Y', ['5X5Y','5X7Y','7X7Y']));
console.log(slow.zoekKortstePadWaypoints('0X0Y', ['5X5Y','5X7Y','7X7Y']));
console.log('---------------------------------------------------timing bij grote graaf--------------------------------------------------------------------------');
graaf.reset();
slow.reset();
graaf.maakGrid(100,10);
slow.maakGrid(100,10);
graaf.verwijderKnopen(['80X8Y','81X8Y']);
slow.verwijderKnopen(['80X8Y','81X8Y']);
console.log(graaf.zoekKortstePadWaypoints('0X0Y', ['1X1Y','17X9Y','12X4Y','54X3Y','98X9Y']));
console.log(slow.zoekKortstePadWaypoints('0X0Y', ['1X1Y','17X9Y','12X4Y','54X3Y','98X9Y']));