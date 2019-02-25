const Graaf = require('./graaf');
const Slow = require('./graaf zonder priority queue');
let graaf = new Graaf();
let slow = new Slow();
for (i = 0; i < 10; i++){
    for (j = 0; j < 10; j++){
        graaf.voegKnopenToe([i+'X'+j+'Y']);
        slow.voegKnopenToe([i+'X'+j+'Y']);
    }
}
for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
        graaf.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+j+'Y',1]]);
        graaf.voegVerbindingenToe([[i+'X'+j+'Y',i+'X'+(j.valueOf()+1)+'Y',1]]);
        graaf.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+(j.valueOf()+1)+'Y',1]]);
        slow.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+j+'Y',1]]);
        slow.voegVerbindingenToe([[i+'X'+j+'Y',i+'X'+(j.valueOf()+1)+'Y',1]]);
        slow.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+(j.valueOf()+1)+'Y',1]]);
    }
}
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
for (i = 0; i < 100; i++){
    for (j = 0; j < 10; j++){
        graaf.voegKnopenToe([i+'X'+j+'Y']);
        slow.voegKnopenToe([i+'X'+j+'Y']);
    }
}
for (i = 0; i < 99; i++) {
    for (j = 0; j < 9; j++) {
        graaf.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+j+'Y',1]]);
        graaf.voegVerbindingenToe([[i+'X'+j+'Y',i+'X'+(j.valueOf()+1)+'Y',1]]);
        graaf.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+(j.valueOf()+1)+'Y',1]]);
        slow.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+j+'Y',1]]);
        slow.voegVerbindingenToe([[i+'X'+j+'Y',i+'X'+(j.valueOf()+1)+'Y',1]]);
        slow.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+(j.valueOf()+1)+'Y',1]]);
    }
}
graaf.verwijderKnopen(['80X8Y','81X8Y']);
slow.verwijderKnopen(['80X8Y','81X8Y']);
console.log(graaf.zoekKortstePadWaypoints('0X0Y', ['1X1Y','17X9Y','12X4Y','54X3Y','98X9Y']));
console.log(slow.zoekKortstePadWaypoints('0X0Y', ['1X1Y','17X9Y','12X4Y','54X3Y','98X9Y']));