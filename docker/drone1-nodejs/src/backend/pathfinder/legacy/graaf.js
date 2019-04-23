const PriorityQueue = require('../priorityQueue');
class Graaf {
    constructor() {
        this.knopen = [];
        this.verbindingen = [];
        this.mapId = undefined;
    }

    toString(){
        console.log(this.knopen + 'zijn de knopen');
        console.log(this.verbindingen + 'zijn de verbindingen');
    }

    maakGrid(sizeX, sizeY){
        for (let i = 0; i < sizeX; i++){
            for (let j = 0; j < sizeY; j++){
                this.voegKnopenToe([i+'X'+j+'Y']);
            }
        }
        for (let i = 0; i < sizeX-1; i++) {
            for (let j = 0; j < sizeY; j++) {
                this.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+j+'Y',1]]);
            }
        }
        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY-1; j++) {
                this.voegVerbindingenToe([[i+'X'+j+'Y',i+'X'+(j.valueOf()+1)+'Y',1]]);
            }
        }
        for (let i = 0; i < sizeX-1; i++) {
            for (let j = 0; j < sizeY-1; j++) {
                this.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+(j.valueOf()+1)+'Y',1.9]]);
            }
        }
        for (let i = 0; i < sizeX-1; i++) {
            for (let j = 1; j < sizeY; j++) {
                this.voegVerbindingenToe([[i+'X'+j+'Y',(i.valueOf()+1)+'X'+(j.valueOf()-1)+'Y',1.9]]);
            }
        }
    }

    checkKnopen(knopen){
        let correct = true;
        if (knopen.constructor === Array) {
            let regex = /(\d+)X(\d+)Y/;
            knopen.forEach(function (knoop) {
                if (!regex.test(knoop)) {
                    correct = false;
                }
            });
        } else {
            correct = false;
        }
        return correct;
    }

    //toevoegen van knopen op de graaf adhv een array.
    voegKnopenToe(knopen) {
        if (this.checkKnopen(knopen)){
            this.knopen = this.knopen.concat(knopen)
        } else {
            throw 'Foute knopen'
        }
    }

    //reset knopen en verbindingen
    reset(){
        this.knopen = [];
        this.verbindingen = [];
    }

    //toevoegen van verbindingen tussen verschillende knopen adhv een array van arrays bestaande uit 3 waarden: knoop1, knoop2 en een gewicht.
    voegVerbindingenToe(verbindingen) {
        let graaf = this;
        verbindingen.forEach(function(verbinding){
            if (verbinding.constructor === Array && verbinding.length === 3 && (typeof verbinding[2] === "number" || verbinding[2] >= 0) && graaf.knopen.indexOf(verbinding[0]) >= 0 && graaf.knopen.indexOf(verbinding[1]) >= 0){
                graaf.verbindingen.push(verbinding);
            } else {
                console.log("AJE HIER WE HEBT HEBDE EEN SERIEUS PROBLEEM VRIEND")
                throw 'Geen correcte array van verbindingen of een of meer van de opgegeven knopen bestaat niet'
            }
        });
    }

    //verwijderen van knopen en zijn verbindingen
    verwijderKnopen(knopen){
        let graaf = this;
        if (this.checkKnopen(knopen)) {
            knopen.forEach(function (knoop) {
                graaf.verbindingen.forEach(function (verbinding) {
                    if (verbinding[0] === knoop) {
                        graaf.verbindingen.splice(graaf.verbindingen.indexOf(verbinding), 1);
                    } else if (verbinding[1] === knoop) {
                        graaf.verbindingen.splice(graaf.verbindingen.indexOf(verbinding), 1);
                    }
                });
                graaf.knopen.splice(graaf.knopen.indexOf(knoop), 1);
            });
        } else {
            throw 'Array bevat een foute knoop'
        }
    }

    //verwijder knopen op basis van linker bovenhoek tot rechter onderhoek
    verwijderKnopenV2(knoopLB, knoopRO, droneValue){
        let graaf = this;
        //knopen in no fly zone verwijderen
        for (let x = knoopLB.x; x <= knoopRO.x; x++){
            for (let y = knoopLB.y; y <= knoopRO.y; y++){
                let knoop = x+'X'+y+'Y';
                graaf.verbindingen.forEach(function (verbinding) {
                    if (verbinding[0] === knoop || verbinding[1] === knoop) {
                        graaf.verbindingen.splice(graaf.verbindingen.indexOf(verbinding), 1);
                    }
                });
            }
        }
        //dangerzone maken rond de objecten boven ˅
        for (let value = droneValue; value > 1; value--){
            for (let x = knoopLB.x-(droneValue-value)-1; x <= knoopRO.x+(droneValue-value)+1; x++){
                graaf.verbindingen.forEach(function (verbinding) {
                    let knoop = x+'X'+knoopLB.y-(droneValue-value)-1+'Y';
                    if (verbinding[0] === knoop || verbinding[1] === knoop) {
                        verbinding[2] = value;
                    }
                });
            }
        }
        //dangerzone maken rond de objecten links >
        for (let value = droneValue; value > 1; value--){
            for (let y = knoopLB.y-(droneValue-value)-1; y <= knoopRO.y+(droneValue-value)+1; y++){
                graaf.verbindingen.forEach(function (verbinding) {
                    let knoop = knoopLB.x-(droneValue-value)-1+'X'+y+'Y';
                    if (verbinding[0] === knoop || verbinding[1] === knoop) {
                        verbinding[2] = value;
                    }
                });
            }
        }
        //dangerzone maken rond de objecten rechts <
        for (let value = droneValue; value > 1; value--){
            for (let y = knoopLB.y-(droneValue-value)-1; y <= knoopRO.y+(droneValue-value)+1; y++){
                graaf.verbindingen.forEach(function (verbinding) {
                    let knoop = knoopRO.x+(droneValue-value)+1+'X'+y+'Y';
                    if (verbinding[0] === knoop || verbinding[1] === knoop) {
                        verbinding[2] = value;
                    }
                });
            }
        }
        //dangerzone maken rond de objecten onder ^
        for (let value = droneValue; value > 1; value--){
            for (let x = knoopRO.x-(droneValue-value)-1; x <= knoopRO.x+(droneValue-value)+1; x++){
                graaf.verbindingen.forEach(function (verbinding) {
                    let knoop = x+'X'+knoopRO.y+(droneValue-value)+1+'Y';
                    if (verbinding[0] === knoop || verbinding[1] === knoop) {
                        verbinding[2] = value;
                    }
                });
            }
        }
    }



    //kortste pad zoeken nummer komen overeen met uitleg wikipedia Dijkstra's algorithm 2.Algoritm
    zoekKortstePad(begin, eind) {
        let bezocht = {},
            afstand = {},
            huidige,
            vorigeKnoop = {},
            pad = [],
            knoop1,
            knoop2,
            totaleAfstand;
        let pQueue = new PriorityQueue();

        //markeer alle nodes als onbezocht en creeer een lijst van de onbezochte knopen. (1)
        this.knopen.forEach(function (knoop) {
            if (knoop == begin){
                afstand[knoop] = 0;
                pQueue.voegKnoopToeMetPrioriteit(knoop, afstand[knoop]);
            } else {
                afstand[knoop] = Infinity; //zet de afstand van de de beginknoop op 0 en van alle andere knopen op oneindig. (2)
            }
        });
        //selecteer de knoop met de kleinste afstand als de huidige knoop, bekijk alle knopen met wie deze verbonden is en kijk wat het kortste pad is naar deze knoop (3)
        while (!pQueue.isLeeg()) {
            huidige = pQueue.geefEersteKnoop();//de knoop met de kleinste afstand wordt als eerste geselecteerd, meest prioriteit
            bezocht[huidige] = true;
            //bekijk alle knopen die een verbinding bevatten met de geselecteerde knoop
            this.verbindingen.filter(function(verbinding){
                knoop1 = verbinding[0];
                knoop2 = verbinding[1];
                return knoop1 === huidige || knoop2 === huidige;
            }).forEach(function(verbinding){ //voor elke verbonden knoop
                //controle of we van knoop1 -> knoop2 gaan of andersom
                if (verbinding[0] === huidige){// 1 -> 2
                    knoop1 = verbinding[0];
                    knoop2 = verbinding[1];
                } else {
                    knoop2 = verbinding[0];
                    knoop1 = verbinding[1];
                }
                if (!bezocht[knoop2]){
                    bezocht[knoop2] = true;
                    pQueue.voegKnoopToeMetPrioriteit(knoop2, afstand[knoop2]);
                }
                totaleAfstand = afstand[huidige] + verbinding[2];
                //indien we een korter pad hebben gevonden naar deze knoop update de afstand
                if (afstand[knoop2] > totaleAfstand){
                    afstand[knoop2] = totaleAfstand;
                    bezocht[knoop2] = huidige;
                    vorigeKnoop[knoop2] = knoop1;
                    pQueue.verminderPrioriteit(knoop2, totaleAfstand);
                }
            });
            //verwijder bezochte knoop (4)
            pQueue.verwijderPKnoop();

            //indien we de eindknoop bereikt hebben stopt het hier (5) anders wordt de lus vanaf stap 3 herhaald (6)
        }
        //creeeren van het gevraagde pad
        totaleAfstand = afstand[eind];
        while (eind){
            pad.unshift(eind);
            eind = vorigeKnoop[eind];
        }
        pad.unshift(totaleAfstand);
        return pad;
    }

    zoekKortstePadWaypoints(start, waypoints){
        if (this.checkKnopen(waypoints)){
            this.waypoints = waypoints;
        } else {
            throw 'Foute array van waypoints'
        }
        let pad = [];
        //pad.push(start); //eerste knoop toevoegen
        let graaf = this;
        let totaleAfstand = 0;
        while (Object.keys(waypoints).length > 0) {
            let gekozenEindknoop;
            let afstandVanafVorigeKnoop = Infinity;
            let gekozenpad;
            this.waypoints.forEach(function (eind) {
                let testpad = graaf.zoekKortstePad(start, eind);
                let afstand = testpad[0];
                if (afstand < afstandVanafVorigeKnoop) { // een kleinere afstand gevonden tot 1 van de waypoints dus deze eerst bezoeken
                    gekozenEindknoop = eind;
                    afstandVanafVorigeKnoop = afstand;
                    testpad.shift(); // eerste elemant bevat de afstand tot de waypoint wat hier onbelangrijk is
                    //testpad.shift(); // tweede element bevat het startelement dat overeenkomt met het vorige eindelement en moet hier dus verwijderd worden
                    gekozenpad = testpad;
                }
            });
            pad.push(gekozenpad);
            totaleAfstand += afstandVanafVorigeKnoop;
            start = gekozenEindknoop;
            this.waypoints.splice(this.waypoints.indexOf(gekozenEindknoop),1);
        }
        pad.unshift(totaleAfstand);
        return pad;
    }
};
module.exports = Graaf;
