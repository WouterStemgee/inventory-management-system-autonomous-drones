const PriorityQueue = require('./priorityQueue');
const Knoop = require('./knoop');

class GraafImproved {
    constructor() {
        this.knopen = [];
        this.verbindingen = [];
        this.afstand = {};
        this.obstakels = []; //obstakel voor; [LB, RB, RO, LO]
        this.droneValue = 0; //range rond drone die te vermijden is
        this.sizeX = 30190;
        this.sizeY = 10901.944444;
        this.mapId;
    }

    setMapId(mapId) {
        // map id koppelen aan de graaf
        this.mapId = mapId;
    }

    setSize(sizeX, sizeY) {
        // grootte van de map bijhouden
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    setDroneValue(droneValue) {
        // drone radius bijhouden (minumum afstand dat de drone wilt houden tov de obstakels)
        this.droneValue = droneValue;
    }

    ObstakelWaypoints(knoopLB, knoopRO) {
        //verwijder knopen en verbindingen binnen en te dicht bij een obstakel
        this.resetVerbindingen();

        //add to obstakels
        let knoopLU, knoopRU, knoopLD, knoopRD;
        knoopLU = new Knoop(knoopLB.x, knoopLB.y);
        knoopRU = new Knoop(knoopRO.x, knoopLB.y);
        knoopRD = new Knoop(knoopRO.x, knoopRO.y);
        knoopLD = new Knoop(knoopLB.x, knoopRO.y);
        this.obstakels.push([knoopLU, knoopRU, knoopRD, knoopLD]);

        //add to nieuwe knopen
        knoopLU = new Knoop(knoopLB.x - this.droneValue, knoopLB.y - this.droneValue);
        knoopRU = new Knoop(knoopRO.x + this.droneValue, knoopLB.y - this.droneValue);
        knoopRD = new Knoop(knoopRO.x + this.droneValue, knoopRO.y + this.droneValue);
        knoopLD = new Knoop(knoopLB.x - this.droneValue, knoopRO.y + this.droneValue);
        this.voegKnoopToe(knoopLU);
        this.voegKnoopToe(knoopRU);
        this.voegKnoopToe(knoopRD);
        this.voegKnoopToe(knoopLD);

        //verbindingen moeten nog gemaakt worden
        for (let i = 0; i < this.knopen.length; i++) {
            this.maakVerbindingen(this.knopen[i]);
        }
    }

    resetVerbindingen() {
        // clear de verbindingen
        this.verbindingen = [];
    };

    voegKnoopToe(knoop) {
        // toevoegen van knopen op de graaf indien deze binnen de map valt en niet te dicht bij de muren is
        if (knoop.x >= this.droneValue && knoop.y >= this.droneValue && knoop.x <= this.sizeX - this.droneValue && knoop.y <= this.sizeY - this.droneValue && this.myIndexOf(knoop) < 0) {
            this.knopen.push(knoop);
        }
    }

    maakVerbindingen(knoop1) {
        // maakt alle verbindingen van de opgegeven knoop met de andere knopen
        // hierbij wordt rekening gehouden met de obstakels
        // 2 knopen worden pas verbonden indien deze verbinding niet door of te dicht bij een obstakel gaaat
        if (this.knopen.length > 0) {
            for (let point of this.knopen) {
                let clean = true;
                let lijnstuk1 = [];
                lijnstuk1.push(point, knoop1);
                let i = 0;
                while (clean && i < this.obstakels.length) {
                    let obstakel = this.obstakels[i];
                    for (let i = 0; i < 3; i++) {
                        let lijnstuk2 = [];
                        lijnstuk2.push(obstakel[i], obstakel[i + 1]);
                        if (!this.collision(lijnstuk1, lijnstuk2)) {
                            clean = false;
                        }
                    }
                    let lijnstuk2 = [];
                    lijnstuk2.push(obstakel[0], obstakel[3]);
                    if (!this.collision(lijnstuk1, lijnstuk2)) {
                        clean = false;
                    }
                    i++;
                }
                if (clean) {
                    //console.log(knoop1, point, "toegevoegd");
                    this.voegVerbindingenToe([knoop1, point, this.heuristics(knoop1, point)]);
                }
            }
        }
    }

    myIndexOf(knoop) {
        // index van de knoop met dezelfde waardes achterhalen, equals is niet te overschrijven in javascript...
        for (let i = 0; i < this.knopen.length; i++) {
            if (this.knopen[i].x == knoop.x && this.knopen[i].y == knoop.y) {
                return i;
            }
        }
        return -1;
    };

    voegVerbindingenToe(verbinding) {
        // voeg de verbinding toe aan de array van verbindingen
        // zal enkel opgeroepen worden indien de verbinding veilig is voor de drone om te vliegen
        let graaf = this;
        if (verbinding.constructor === Array && verbinding.length === 3 && (typeof verbinding[2] === "number" && verbinding[2] >= 0) && graaf.myIndexOf(verbinding[0]) >= 0 && graaf.myIndexOf(verbinding[1]) >= 0) {
            graaf.verbindingen.push(verbinding);
        } else {
            throw 'Geen correcte array van verbindingen of een of meer van de opgegeven knopen bestaat niet'
        }
    };

    // oude methode om grid te maken, legacy
    /*
    maakGrid(sizeX, sizeY, jump = 1){
        for (let i = 0; i < sizeX; i += jump){
            for (let j = 0; j < sizeY; j += jump){
                let knoop = new Knoop(i, j);
                this.voegKnoopToe(knoop);
            }
        }
        for (let i = 0; i < sizeX-1; i += jump) {
            for (let j = 0; j < sizeY; j += jump) {
                let knoop1 = new Knoop(i, j);
                let knoop2 = new Knoop(i + 1, j);
                this.voegVerbindingenToe([[knoop1,knoop2,1]]);
            }
        }
        for (let i = 0; i < sizeX; i += jump) {
            for (let j = 0; j < sizeY-1; j += jump) {
                let knoop1 = new Knoop(i, j);
                let knoop2 = new Knoop(i, j + 1);
                this.voegVerbindingenToe([[knoop1,knoop2,1]]);
            }
        }
        for (let i = 0; i < sizeX-1; i += jump) {
            for (let j = 0; j < sizeY-1; j += jump) {
                let knoop1 = new Knoop(i, j);
                let knoop2 = new Knoop(i + 1, j + 1);
                this.voegVerbindingenToe([[knoop1,knoop2,1.44]]);
            }
        }
        for (let i = 0; i < sizeX-1; i += jump) {
            for (let j = 1; j < sizeY; j += jump) {
                let knoop1 = new Knoop(i, j);
                let knoop2 = new Knoop(i + 1, j - 1);
                this.voegVerbindingenToe([[knoop1,knoop2,1.44]]);
            }
        }
    };
    */

    collision(lijnstuk1, lijnstuk2) {
        // berekend de kortste afstand tussen de 2 opgegevn lijnstukken in 2D
        // er wordt geen rekening gehouden met de Z-as
        let p1x = lijnstuk1[0].x;
        let p2x = lijnstuk1[1].x;
        let p3x = lijnstuk2[0].x;
        let p4x = lijnstuk2[1].x;
        let p1y = lijnstuk1[0].y;
        let p2y = lijnstuk1[1].y;
        let p3y = lijnstuk2[0].y;
        let p4y = lijnstuk2[1].y;

        let p13x = p1x - p3x;
        let p13y = p1y - p3y;

        let p43x = p4x - p3x;
        let p43y = p4y - p3y;

        if (Math.abs(p43x) < Number.EPSILON && Math.abs(p43y) < Number.EPSILON) {
            //console.log("zeker yeet 1?");
            //console.log(lijnstuk1, lijnstuk2);
            return false;
        }

        let p21x = p2x - p1x;
        let p21y = p2y - p1y;

        if (Math.abs(p21x) < Number.EPSILON && Math.abs(p21y) < Number.EPSILON) {
            // punt1 en 2 zijn dezelfde
            return true;
        }


        let d1343 = (p13x * p43x) + (p13y * p43y);
        let d4321 = (p43x * p21x) + (p43y * p21y);
        let d1321 = (p13x * p21x) + (p13y * p21y);
        let d4343 = (p43x * p43x) + (p43y * p43y);
        let d2121 = (p21x * p21x) + (p21y * p21y);

        let denom = (d2121 * d4343) - (d4321 * d4321);
        let numer = (d1343 * d4321) - (d1321 * d4343);
        if (Math.abs(denom) < Number.EPSILON) {
            // evenwijdig dus ok indien de afstand tussen de rechten >= droneValue;
            if (p1x === p2x && p3x === p4x) {
                return Math.abs(p1x - p3x) >= this.droneValue
            } else if (p1y === p2y && p3y === p4y) {
                return Math.abs(p1y - p3y) >= this.droneValue
            }
            return false;
        }

        let mua = numer / denom;
        let mub = (d1343 + (d4321 * mua)) / d4343;

        let pa = new Knoop(p1x + (mua * p21x), p1y + (mua * p21y));
        let pb = new Knoop(p3x + (mub * p43x), p3y + (mub * p43y));

        // check correctie punt nie op lijntuk
        // de afstand wordt namelijk berekend op de rechte en niet het lijnstuk,
        // indien het snijpunt dus buiten het lijnstuk valt moet dit gecorrigeerd worden
        if ((this.heuristics(lijnstuk1[0], pa) + this.heuristics(lijnstuk1[1], pa)).toFixed(5) != this.heuristics(lijnstuk1[0], lijnstuk1[1]).toFixed(5)) {
            if (this.heuristics(lijnstuk1[0], pa) < this.heuristics(lijnstuk1[1], pa)) {
                pa = lijnstuk1[0];
            } else {
                pa = lijnstuk1[1];
            }
        }
        if ((this.heuristics(lijnstuk2[0], pb) + this.heuristics(lijnstuk2[1], pb)).toFixed(5) != this.heuristics(lijnstuk2[0], lijnstuk2[1]).toFixed(5)) {
            if (this.heuristics(lijnstuk2[0], pb) < this.heuristics(lijnstuk2[1], pb)) {
                pb = lijnstuk2[0];
            } else {
                pb = lijnstuk2[1];
            }
        }
        return this.heuristics(pa, pb) >= this.droneValue;
    }

    geefBuren(knoop) {
        // geeft alle knopen waarmee de opgegevn knoop is verbonden
        let buren = [];
        let knoop1, knoop2;
        this.verbindingen.filter(function (verbinding) {
            knoop1 = verbinding[0];
            knoop2 = verbinding[1];
            return (knoop1.x == knoop.x && knoop1.y == knoop.y) || (knoop2.x == knoop.x && knoop2.y == knoop.y);
        }).forEach(function (verbinding) {
            knoop1 = verbinding[0];
            knoop2 = verbinding[1];
            if (knoop1.x == knoop.x && knoop1.y == knoop.y) {
                buren.push([knoop2, verbinding[2]]);
            } else {
                buren.push([knoop1, verbinding[2]]);
            }
        });
        return buren;
    };

    heuristics(begin, eind) {
        // berekent de afstand van het beginpunt tot het eindpunt
        // wordt gebruikt om de prioriteitsqueue correct op te stellen
        let h = Math.sqrt(Math.pow(begin.x - eind.x, 2) + Math.pow(begin.y - eind.y, 2));
        return h;
    };

    zoekPad(start, eind) {
        // zoekt het pad tussen de begin en eindknoop, zal ook de totale afstand terugsturen
        // begin en eindpunt toevoegen aan graaf en verbindingen maken
        let startk = new Knoop(start.x, start.y);
        this.voegKnoopToe(startk);
        let eindk = new Knoop(eind.x, eind.y);
        this.voegKnoopToe(eindk);
        this.maakVerbindingen(startk);
        this.maakVerbindingen(eindk);
        let dees = this;
        let pQueue = new PriorityQueue();

        // markeer alle nodes als onbezocht en creeer een lijst van de onbezochte knopen.
        this.knopen.forEach(function (knoop) {
            if (knoop.x === start.x && knoop.y === start.y) {
                pQueue.voegKnoopToeMetPrioriteit(knoop, 0);
                knoop.afstand = 0;
            } else {
                knoop.afstand = Infinity; // zet de afstand van de de beginknoop op 0 en van alle andere knopen op oneindig.
            }
            knoop.vorige = null;
            knoop.bezocht = false;
        });

        // selecteer de knoop met de kleinste afstand als de huidige knoop, bekijk alle knopen met wie deze verbonden is en kijk wat het kortste pad is naar deze knoop
        while (!pQueue.isLeeg()) {
            let huidige = pQueue.geefEersteKnoop(); // de knoop met de kleinste afstand wordt als eerste geselecteerd, meest prioriteit
            huidige.bezocht = true;

            // stop indien we het einde hebben bereikt
            if (huidige.x === eindk.x && huidige.y === eindk.y) {
                return dees.geefPad(huidige, start);
            }

            // bekijk alle knopen die een verbinding bevatten met de geselecteerde knoop
            for (let volgende of this.geefBuren(huidige)) {
                if (!volgende[0].bezocht) {
                    volgende[0].bezocht = true;
                    pQueue.voegKnoopToeMetPrioriteit(volgende[0], volgende[1]);
                }
                let totaleAfstand = huidige.afstand + volgende[1];
                // indien we een korter pad hebben gevonden naar deze knoop update de afstand
                if (totaleAfstand < volgende[0].afstand) {
                    volgende[0].afstand = totaleAfstand;
                    pQueue.verminderPrioriteit(volgende[0], totaleAfstand + dees.heuristics(eind, volgende[0]));
                    volgende[0].vorige = huidige;
                }
            }
            // verwijder bezochte knoop
            pQueue.verwijderPKnoop();
        }
        throw 'kan eindknoop niet vinden';
    };

    zoekMultiplePaden(start, waypoints) {
        // maakt het pad van start tot het dichtste waypoint
        // vervolgens wordt vanaf deze gekozen knoop opnieuw de dichtste knoop gezicht van de andere waypoints
        // dit gaat door tot alle waypoints bezocht zijn
        let graaf = this;
        let startk = new Knoop(start.x, start.y);
        this.voegKnoopToe(startk);
        let toevoeging = [];
        toevoeging.push(startk);
        waypoints.forEach(function (knoop) {
            let temp = new Knoop(knoop.x, knoop.y);
            graaf.voegKnoopToe(temp);
            toevoeging.push(temp);
        });
        toevoeging.forEach(function (knoop) {
            graaf.maakVerbindingen(knoop);
        });


        let pad = [];
        //pad.push(start); //eerste knoop toevoegen
        let totaleAfstand = 0;
        while (waypoints.length > 0) {
            let gekozenEindknoop = null;
            let afstandVanafVorigeKnoop = Infinity;
            let gekozenpad;
            for (let eind of waypoints) {
                let testpad = graaf.zoekPad(start, eind);
                let afstand = testpad.shift(); // eerste elemant bevat de afstand tot de waypoint wat hier onbelangrijk is
                if (afstand < afstandVanafVorigeKnoop) { // een kleinere afstand gevonden tot 1 van de waypoints dus deze eerst bezoeken
                    gekozenEindknoop = eind;
                    afstandVanafVorigeKnoop = afstand;
                    //testpad.shift(); // tweede element bevat het startelement dat overeenkomt met het vorige eindelement en moet hier dus verwijderd worden
                    gekozenpad = testpad;
                }
            }
            if (!gekozenEindknoop) {
                throw 'fok';
            }
            pad = pad.concat(gekozenpad);
            totaleAfstand += afstandVanafVorigeKnoop;
            start = gekozenEindknoop;
            waypoints.splice(waypoints.indexOf(gekozenEindknoop), 1);
        }
        //pad.unshift(totaleAfstand);
        //reset de graaf
        this.verbindingen.forEach(function (verbinding) {
            verbinding[0].bezocht = false;
            verbinding[0].afstand = Infinity;
            verbinding[0].vorige = null;
            verbinding[1].bezocht = false;
            verbinding[1].afstand = Infinity;
            verbinding[1].vorige = null;
        });
        return pad;
    }

    geefPad(knoop, start) {
        // opmaak van het return pad
        let pad = [];
        let afstand = knoop.afstand;
        if (afstand != Infinity) {
            while (knoop.vorige != null) {
                pad.unshift({"x": knoop.x, "y": knoop.y});
                knoop = knoop.vorige;
            }
            pad.unshift({"x": start.x, "y": start.y});
            pad.unshift(afstand);
            return pad;
        }
        else {
            throw 'Rip dit pad is niet mogelijk'
        }
    };

    eigenPad(knopen) {
        // controle of opgegeven pad door of te dicht bij obstakels gaat
        let graaf = this;
        knopen.forEach(function (knoop) {
            let temp = new Knoop(knoop.x, knoop.y);
            graaf.voegKnoopToe(temp);
        });
        let i = 0;
        let clean = true;
        while (clean && i < knopen.length - 1) {
            let j = 0;
            let knoop1 = knopen[i];
            let knoop2 = knopen[i + 1];
            let lijnstuk1 = [knoop1, knoop2];
            while (clean && j < this.obstakels.length) {
                let obstakel = this.obstakels[j];
                for (let k = 0; k < 3; k++) {
                    let lijnstuk2 = [];
                    lijnstuk2.push(obstakel[k], obstakel[k + 1]);
                    if (!this.collision(lijnstuk1, lijnstuk2)) {
                        clean = false;
                    }
                }
                let lijnstuk2 = [];
                lijnstuk2.push(obstakel[0], obstakel[3]);
                if (!this.collision(lijnstuk1, lijnstuk2)) {
                    clean = false;
                }
                j++;
            }
            i++;
        }
        if (clean) {
            return knopen;
        } else {
            throw 'Dit pad gaat door obstakels';
        }
    }

    /*
    // eigen correctie zonder A* dit werkt slechter
    eigenPadMetCorrectie(knopen){
        let graaf = this;
        knopen.forEach(function (knoop) {
            let temp = new Knoop(knoop.x, knoop.y);
            graaf.voegKnoopToe(temp);
        });
        let pad = [];
        let i = 0;
        let clean = true;
        while (clean && i < knopen.length-1){
            let j = 0;
            let knoop1 = knopen[i];
            let knoop2 = knopen[i+1];
            let lijnstuk1 = [knoop1, knoop2];
            while (clean && j < this.obstakels.length) {
                let obstakel = this.obstakels[j];
                for (let k = 0; k < 3; k++) {
                    let lijnstuk2 = [];
                    lijnstuk2.push(obstakel[k], obstakel[k + 1]);
                    if (!this.collision(lijnstuk1, lijnstuk2)) {
                        clean = false;
                    }
                }
                let lijnstuk2 = [];
                lijnstuk2.push(obstakel[0], obstakel[3]);
                if (!this.collision(lijnstuk1, lijnstuk2)) {
                    clean = false;
                }
                j++;
            }
            pad.push(knopen[i]);
            i++;
        }
        if (clean){
            pad.push(knopen[i]);
            return pad;
        } else {
            //i--; //probleem bij ide knoop dus keer terug naar de vorige knoop
            let afstand = Infinity;
            let dichtste = [];
            let graaf = this;
            this.knopen.forEach(function(knoop){
                let clean = true;
                let j = 0;
                while (clean && j < graaf.obstakels.length) {
                    let obstakel = graaf.obstakels[j];
                    for (let k = 0; k < 3; k++) {
                        let lijnstuk2 = [];
                        lijnstuk2.push(obstakel[k], obstakel[k + 1]);
                        if (!graaf.collision([knopen[i- 1], knoop], lijnstuk2) || !graaf.collision([knopen[i], knoop], lijnstuk2)) {
                            clean = false;
                        }
                    }
                    let lijnstuk2 = [];
                    lijnstuk2.push(obstakel[0], obstakel[3]);
                    if (!graaf.collision([knopen[i - 1], knoop], lijnstuk2) || !graaf.collision([knopen[i], knoop], lijnstuk2)) {
                        clean = false;
                    }
                    j++;
                }
                if (clean) {
                    let temp = graaf.heuristics(knopen[i - 1], knoop) + graaf.heuristics(knopen[i], knoop);
                    if (temp < afstand) {
                        afstand = temp;
                        dichtste.push({"x": knoop.x, "y": knoop.y});
                    }
                }
            });
            if (dichtste.length === 0){
                let graaf = this;
                this.knopen.forEach(function(knoop1) {
                    graaf.knopen.forEach(function (knoop2) {
                        let clean = true;
                        let j = 0;
                        while (clean && j < graaf.obstakels.length) {
                            let obstakel = graaf.obstakels[j];
                            for (let k = 0; k < 3; k++) {
                                let lijnstuk2 = [];
                                lijnstuk2.push(obstakel[k], obstakel[k + 1]);
                                if (!graaf.collision([knopen[i - 1], knoop1], lijnstuk2) || !graaf.collision([knoop1, knoop2], lijnstuk2)) {
                                    clean = false;
                                }
                            }
                            let lijnstuk2 = [];
                            lijnstuk2.push(obstakel[0], obstakel[3]);
                            if (!graaf.collision([knopen[i - 1], knoop1], lijnstuk2) || !graaf.collision([knoop1, knoop2], lijnstuk2)) {
                                clean = false;
                            }
                            j++;
                        }
                        if (clean) {
                            if (graaf.heuristics(knopen[i], knoop1) > 0 && graaf.heuristics(knopen[i - 1], knoop2) > 0) {
                                let temp = graaf.heuristics(knopen[i - 1], knoop1) + graaf.heuristics(knopen[i], knoop2);
                                if (temp < afstand) {
                                    afstand = temp;
                                    dichtste = [];
                                    dichtste.push({"x": knoop1.x, "y": knoop1.y}, {"x": knoop2.x, "y": knoop2.y});
                                }
                            }
                        }
                    });
                });
            }
            knopen = knopen.slice(i);
            for (let i = dichtste.length - 1; i>=0; i--){
                knopen.unshift(dichtste[i]);
            }
            let correctie = this.eigenPadMetCorrectie(knopen);
            correctie.forEach(function (knoop) {
                pad.push(knoop);
            })
            return pad;
        }
    }
    */

    eigenPadMetASter(knopen) {
        // indien het pad door of te dicht bij een obstakel komt
        // wordt het kortste pad tussen de 2 punten gezocht zonder door of te dicht bij een obstakel te komen
        let graaf = this;
        let toevoeging = [];
        knopen.forEach(function (knoop) {
            let temp = new Knoop(knoop.x, knoop.y);
            graaf.voegKnoopToe(temp);
            toevoeging.push(temp);
        });
        toevoeging.forEach(function (knoop) {
            graaf.maakVerbindingen(knoop);
        });
        let pad = [];
        let i = 0;
        let clean = true;
        while (clean && i < knopen.length - 1) {
            let j = 0;
            let knoop1 = knopen[i];
            let knoop2 = knopen[i + 1];
            let lijnstuk1 = [knoop1, knoop2];
            while (clean && j < this.obstakels.length) {
                let obstakel = this.obstakels[j];
                for (let k = 0; k < 3; k++) {
                    let lijnstuk2 = [];
                    lijnstuk2.push(obstakel[k], obstakel[k + 1]);
                    if (!this.collision(lijnstuk1, lijnstuk2)) {
                        clean = false;
                    }
                }
                let lijnstuk2 = [];
                lijnstuk2.push(obstakel[0], obstakel[3]);
                if (!this.collision(lijnstuk1, lijnstuk2)) {
                    clean = false;
                }
                j++;
            }
            pad.push(knopen[i]);
            i++;
        }
        if (clean) {
            pad.push(knopen[i]);
            return pad;
        } else {
            let correctie = this.zoekPad(knopen[i - 1], knopen[i]);
            for (let m = 2; m < correctie.length - 1; m++) {
                pad.push(correctie[m]);
            }
            knopen = knopen.slice(i);
            let toevoeging = this.eigenPadMetASter(knopen);
            toevoeging.forEach(function (knoop) {
                pad.push(knoop);
            });
            return pad;
        }
    }
}

module.exports = GraafImproved;
