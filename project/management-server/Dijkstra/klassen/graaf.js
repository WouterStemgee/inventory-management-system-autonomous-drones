class Graaf {
    constructor() {
        this.knopen = [];
        this.verbindingen = [];
    }

    //toevoegen van knopen op de graaf adhv een array.
    voegKnopenToe(knopen) {
        if (knopen.constructor === Array){
            this.knopen = this.knopen.concat(knopen);
        } else {
            throw 'Geen correcte array van knopen'
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
            } else {
                throw 'Geen correcte array van verbindingen'
            }
        });
        this.verbindingen = this.verbindingen.concat(verbindingen);
    }

    //kortste pad zoeken nummer komen overeen met uitleg wikipedia Dijkstra's algorithm 2.Algoritm
    zoekKortstePad(begin, eind) {
        let bezocht = {},
            onbezochteKnopenLijst = {},
            afstand = {},
            huidige,
            vorigeKnoop = {},
            pad = [];

        //markeer alle nodes als onbezocht en creeer een lijst van de onbezochte knopen. (1)
        this.knopen.forEach(function (knoop) {
            onbezochteKnopenLijst[knoop] = true;
            bezocht[knoop] = null;
        });

        //zet de afstand van de beginknoop tot de beginknoop op 0 en van alle andere knopen op oneindig. (2)
        this.knopen.forEach(function (knoop) {
            afstand[knoop] = Infinity;
        })
        afstand[begin] = 0;

        //selecteer de knoop met de kleinste afstand als de huidige knoop, bekijk alle knopen met wie deze verbonden is en kijk wat het kortste pad is naar deze knoop (3)
        while (Object.keys(onbezochteKnopenLijst).length > 0) {
            huidige = Object.keys(onbezochteKnopenLijst).reduce(function (bezocht, knoop) {
                return afstand[bezocht] > afstand[knoop] ? knoop : bezocht;
            }, Object.keys(onbezochteKnopenLijst)[0]); //de knoop met de kleinste afstand wordt als eerste geselecteerd

            //bekijk alle knopen die een verbinding bevatten met de geselecteerde knoop
            this.verbindingen.filter(function(verbinding){
                let knoop1 = verbinding[0],
                    knoop2 = verbinding[1];
                return knoop1 === huidige || knoop2 === huidige;
            }).forEach(function(verbinding){
                //controle of we van knoop1 -> knoop2 gaan of andersom
                if (verbinding[0] === huidige){// 1 -> 2
                    var knoop1 = verbinding[0],
                        knoop2 = verbinding[1];
                } else {
                    knoop2 = verbinding[0];
                    knoop1 = verbinding[1];
                }
                let totaleAfstand = afstand[huidige] + verbinding[2];
                //indien we een korter pad hebben gevonden naar deze knoop update de afstand
                if (afstand[knoop2] > totaleAfstand){
                    afstand[knoop2] = totaleAfstand;
                    bezocht[knoop2] = huidige;
                    vorigeKnoop[knoop2] = knoop1;
                }
            });

            //verwijder bezochte knoop (4)
            delete  onbezochteKnopenLijst[huidige];

            //indien we de eindknoop bereikt hebben stopt het hier (5) anders wordt de lus vanaf stap 3 herhaald (6)
        }

        //creeeren van het gevraagde pad
        while (eind){
            pad.unshift(eind);
            eind = vorigeKnoop[eind];
        }

        return pad;
    }
};
module.exports = Graaf;