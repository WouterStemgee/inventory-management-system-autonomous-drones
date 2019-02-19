const Graaf = require('./graaf.js')
let graaf = new Graaf();
graaf.voegKnopenToe(['1','2','3','4']);
graaf.voegVerbindingenToe([
    ['1','2',4],
    ['1','3',7],
    ['2','3',1],
    ['1','4',1]
]);
console.log(graaf.zoekKortstePad('1','4'));
graaf.voegKnopenToe(['5','6','7']);
graaf.voegVerbindingenToe([
    ['1','5',20],
    ['2','5',3],
    ['4','5',9]
]);
console.log(graaf.zoekKortstePad('1','5'));