const PriorityKnoop = require('./priorityKnoop');
class PriorityQueue {
    constructor()
    {
        this.knopen = [];
    }

    isLeeg(){
        if (this.knopen.length == 0){
            return true;
        }
        return false;
    }

    //voeg een knoop toe met een prioriteit
    voegKnoopToeMetPrioriteit(knoop, prioriteit){
        let pKnoop = new PriorityKnoop(knoop, prioriteit);
        let toegevoegd = false;
        let i = 0;
        while (!toegevoegd & i < this.knopen.length){
            if (this.knopen[i].prioriteit > pKnoop.prioriteit){
                //positie van de knoop gevonden
                this.knopen.splice(i, 0, pKnoop);
                toegevoegd = true
            }
            i++;
        }
        if (!toegevoegd){//knoop heeft de hoogste prioriteit
            this.knopen.push(pKnoop);
        }
    }

    verwijderPKnoop(){
        if (this.knopen.length == 0){
            throw 'Queue is leeg'
        }
        return this.knopen.shift();
    }

    geefEersteKnoop(){
        if (this.knopen.length == 0){
            throw 'Queue is leeg'
        }
        return this.knopen[0].knoop;
    }

    geefLaatsteKnoop(){
        if (this.knopen.length == 0){
            throw 'Queue is leeg'
        }
        return this.knopen[this.knopen.length - 1].knoop;
    }

    verminderPrioriteit(knoop, prioriteit){
        let gevonden = false;
        let i = 0;
        while (!gevonden && i < this.knopen.length){
            if ((this.knopen[i].knoop.x === knoop.x) && (this.knopen[i].knoop.y === knoop.y)){
                this.knopen.splice(i,1);
                this.voegKnoopToeMetPrioriteit(knoop, prioriteit);
                gevonden = true;
            }
            i++;
        }
    }
};
module.exports = PriorityQueue;
