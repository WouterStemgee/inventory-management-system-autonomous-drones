var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();
const Dijkstra = require('./dijkstra');
let dijkstra = new Dijkstra();
describe('initialisatie van de map', function(){
    it('zou de map moeten ophalen uit de databank en deze opslaan als een graaf waarop dijkstra kan worden toegepast', function(){
        return    dijkstra.initializeMaps().should.eventually.be.true;
    });
});
describe('recalculate van de map', function(){
    it('zou de graaf opnieuw moeten berekenen aan de hand vn de geupdate map uit de database', function(){
        return    dijkstra.recalculateGraaf(0).should.eventually.be.true;
    });
});
describe('bereken het kortste pad ', function(){
    it('zou de graaf opnieuw moeten berekenen aan de hand vn de geupdate map uit de database', function(){
        return    dijkstra.recalculateGraaf(0).should.eventually.be.true;
    });
});
