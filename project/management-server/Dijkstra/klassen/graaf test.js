const Graaf = require('./graaf.js');
const GraafImproved = require('./graafVoorMeerderePunten');
let graaf = new Graaf();
graaf.voegKnopenToe(['1','2','3','4']);
graaf.voegVerbindingenToe([
    ['1','2',4],
    ['1','3',7],
    ['2','3',1],
    ['1','4',1]
]);
graaf.voegKnopenToe(['5','6','7']);
graaf.voegVerbindingenToe([
    ['1','5',20],
    ['2','5',3],
    ['4','5',9]
]);

let graafI = new GraafImproved(graaf, ['2','4','5']);
console.log(graafI.berekenKortstePad('1'));
console.log('--------------------------------------------------------via graafImproved-----------------------------------------------------------------');

let graaf2 = new Graaf();
for (i = 0; i < 10; i++){
    for (j = 0; j < 10; j++){
        graaf2.voegKnopenToe([i+'X'+j+'Y']);
    }
}
for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
        graaf2.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+j+'Y',1]]);
        graaf2.voegVerbindingenToe([[i+'X'+j+'Y',i+'X'+(j.valueOf()+1)+'Y',1]]);
        graaf2.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+(j.valueOf()+1)+'Y',1]]);
    }
}
let graaf2I = new GraafImproved(graaf2, ['5X5Y','5X7Y','7X7Y']);
console.log(graaf2I.berekenKortstePad('0X0Y'));
console.log('---------------------------------------------------via gewone graaf--------------------------------------------------------------------------');
console.log(graaf2.zoekKortstePadWaypoints('0X0Y', ['5X5Y','5X7Y','7X7Y']));