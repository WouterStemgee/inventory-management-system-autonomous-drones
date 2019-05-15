const PriorityKnoop = require('./priorityKnoop');

class PriorityQueue {
    //de priorityqueue
    constructor() {
        this.knopen = [];
    }

    // is true als de queue leeg is
    isLeeg() {
        return this.knopen.length === 0;
    }

    //voeg een knoop toe met een prioriteit
    voegKnoopToeMetPrioriteit(knoop, prioriteit) {
        let pKnoop = new PriorityKnoop(knoop, prioriteit);
        let toegevoegd = false;
        let i = 0;
        while (!toegevoegd && i < this.knopen.length) {
            if (this.knopen[i].prioriteit > pKnoop.prioriteit) {
                //positie van de knoop gevonden
                this.knopen.splice(i, 0, pKnoop);
                toegevoegd = true
            }
            i++;
        }
        if (!toegevoegd) {//knoop heeft de hoogste prioriteit
            this.knopen.push(pKnoop);
        }
    }

    // verwijderd de eerste knoop uit de lijst
    verwijderPKnoop() {
        if (this.knopen.length === 0) {
            throw 'Queue is leeg'
        }
        return this.knopen.shift();
    }

    // geeft de eerste knoop terug uit de lijst
    geefEersteKnoop() {
        if (this.knopen.length === 0) {
            throw 'Queue is leeg'
        }
        return this.knopen[0].knoop;
    }

    // geeft de slechtste knoop terug, wordt niet gebruikt
    geefLaatsteKnoop() {
        if (this.knopen.length === 0) {
            throw 'Queue is leeg'
        }
        return this.knopen[this.knopen.length - 1].knoop;
    }

    // vervangt de prioriteit van de opgegeven knoop door de nieuwe prioriteit
    // hierbij wordt de knoop verwijderd en opnieuw toegevoegd met de nieuwe prioriteit
    verminderPrioriteit(knoop, prioriteit) {
        let gevonden = false;
        let i = 0;
        while (!gevonden && i < this.knopen.length) {
            if ((this.knopen[i].knoop.x === knoop.x) && (this.knopen[i].knoop.y === knoop.y)) {
                this.knopen.splice(i, 1);
                this.voegKnoopToeMetPrioriteit(knoop, prioriteit);
                gevonden = true;
            }
            i++;
        }
    }
}

module.exports = PriorityQueue;
