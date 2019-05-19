# Inventory Management Server
Dit is de backend server, gemaakt met het express framework. Deze server voorziet de http calls die de front end en 
de node-red gebruiken. In deze server leiden routers deze calls om naar een DAO-object dat de mongodb op haalt/wijzigt. 
Ook is er een route voor het pathfinding algoritme. Als laatse is de node-red server ingebed in deze applicatie en zijn ze dus op 
dezelfde poort aan te spreken, hiervoor geldt het volgende:

* calls naar de API zelf komen terecht op localhost:PORT/api
* calls naar node-red op localhost:PORT/red

In deze readme wordt komen verschillende zaken aan bod:
* Server opstarten
* Overzicht Directories en functies
* Overzicht API-calls van express
* Node-RED
* Tekortkomingen / mogelijke uitbreidingen

## Server opstarten

Het enige dat moet gebeuren is het bestand api/bin/www uitvoeren via "node api/bin/www", 
dit zal zowel de express als de node-red opstarten.
In dit bestand staan ook enkele config parameters, zoals de poort waarop de backend server zal draaien, 
en de node-red settings. In app.js staan de andere API routes

## Overzicht directories en functies

* **api:** deze map bevat alle routerbestanden, die de api-calls van buiten opvangen, 
elk routerbestand stelt, op zich, de db voor welke deze routerbestanden zullen wijzigen. Zo zal maps.js
alles afhandelen wat met het ophalen/aanpassen van magazijnen heeft te maken.
    * api/bin bevat het uitvoerbestand om de backend server op te starten, dit gebeurt dus met
        "node api/bin/www"
    * api/config en api/controller dienen voor authenticatie na te gaan op de api-calls
    
* **database:** de DAO objecten die via mongoose data opvragen/aanpassen van de db. 
Ook bevat dit de modellen die door mongoose gebruikt worden om na te gaan of objecten die u wenst 
op te slaan, geldige objecten zijn.

* **nodered:** in lib/flows staan de opgeslagen flows, die je in de node-red editor kan importeren en opzetten.
Geëxporteerde flows komen ook hierin terecht.

* **pathfinder:** Bevat het A* algoritme, ASter.js is het hoofdbestand dat door API-calls en app.js gebruikt wordt om paden 
te berekenen, de rest is intern. Legacy bevat het oude dijkstra algoritme

* **test:** Om de server te testen wordt het bestand testAPI.js voorzien, waarmee alle calls getest worden.

## Overzicht API-calls van express

alle calls zijn tegenover http://localhost:PORT/



* maps.js :
    * Er is een hiërarchische onderverdeling in maps, waardoor producten indiviueel opvragen een lange URL nodig heeft, 
    want diervoor moet ook de scanzone Id gekend zijn waarin dit product zit.
        * api/maps [GET|POST]
        * api/maps/{mapId} [GET|PUT|DELETE]
        * api/maps/{mapId}/obstacles [GET|POST]
        * api/maps/{mapId}/obstacles/{obstacleId} [GET|PUT|DELETE]
        * api/maps/{mapId}/scanzones [GET|POST]
        * api/maps/{mapId}/scanzones/{scanzoneId} [GET|PUT|DELETE]
        * api/maps/{mapId}/scanzones/{scanzoneId}/products [GET|POST]
        * api/maps/{mapId}/scanzones/{scanzoneId}/products/{productId} [GET|PUT|DELETE]
        * api/maps/{mapId}/products [GET]
    
Alhoewel voor alles CRUD operaties zijn voorzien, werkt de front-end vooral met [PUT] api/maps/{mapId} voor de map 
aan te passen in zijn geheel, de andere belangrijkste operatie is [GET] api/maps/{mapId}/products die onmiddellijk 
alle producten van elke scanzone op vraagt, waarbij elke scanzone nog te herkenne valt doordat aan de producten een scanzoneId wordt meegegeven. 


* drones.js:
    * api/drones [GET|POST]
    * api/drones/{droneId} [GET|PUT|DELETE]
    * api/drones/collision [POST]

api/drones/collision wordt niet gebruikt, het was de bedoeling om zo de drone tijdens het pad te monitoren
 of hij al dan niet af wijkt van het vliegpad. Dit wordt veel beter door een andere technologie opgelost
 
 
 * flightpath.js:
    * api/flightpath [POST]
    
 Wordt gebruikt om het beste vliegpad te genereren en op te sturen

---

Gebruikt voor authenticatie

* users.js
 ---
 
 # Node-RED
 
 In deze sectie wordt vooral uitgelegd hoe de node-red als een extra laag bovenop express ligt, en hoe interactie 
 tussen de front-end en de backend zo verloopt. Ook zullen de flows worden onderverdeeld en uitgelegd
 
 * zoals eerder vermeld komen calls op /api/... automatisch terecht op express
 * /red/... calls komen terecht in Node-RED, Node-RED kan echter dan zelf soms nog een call doen op /api, dat dus bij express terecht komt.
 Dit moet soms worden gedaan om zo de data ook in Node-RED beschikbaar te hebben zonder daarvoor veel extra te moeten voorzien.
 
 Een belangrijk voorbeeld daarvan is het berekenen van een optimaal vliegpad, deze functie bevindt zich in de express server. Maar Node-RED moet hierover ook beschikken om de drone te kunnen aansturen.
 De beste optie is om Node-RED de aanvraag door te laten sturen en zelf ook het antwoord van express bij te houden.
 
De drone aansturen verloopt als volgt: Het berekende pad wordt opgesplitst in zijn lijnstukken en dit wordt bijgehouden.
Men kan dit ook zien als de verschillende knooppunten waartussen de drone in een rechte lijn zal vliegen.
Deze knoopunten kunnen gewone punten zijn maar ze kunnen ook scanzones zijn. Node-RED zal de drone lijnstuk per lijnstuk laten afvliegen, door steeds het volgende knooppunt naar de drone te sturen
wanneer de drone op een knooppunt staat. Wanneer het een scanzone is wacht Node-RED hiermee totdat 
de drone ook meldt dat hij klaar is met scannen.

## Flows

 * **Dronebesturing + pad instellen:** Hiermee worden algemeen de belangrijkste besturingselementen van de applicatie voorzien:
    * Voor een vliegpad te valideren zal de front-end hierop posten, en dit zal worden omgeleid naar 
    de back-end om daat het beste pad te laten berekenen. Daarna wordt dit berekende pad bijgehouden in Node-RED 
    (om de knooppunten naar de drone te kunnen sturen)
    en wordt het ook naar de front-end gestuurd.
    * De drone aansturen is voorzien in enkele mini flows, waarbij met een http-request de juiste mqtt node wordt 
    aangestuurd om de drone te laten vliegen/stoppen/landen. In Node-RED wordt er ook statusinfo bijgehouden, 
    die de front-end op vraagt voor controle ipv vb. zomaar de drone te laten vliegen zonder eerst een pad ingesteld te hebben.
    
 * **Dronedata opsturen met websocket:** Dit ontvangt de data van de drone, en stuurt ze door naar de front-end via een websocket. 
 Daartussen wordt de data nog gecached en wordt er rekening gehouden met welke data de gebruiker wil zien.
  Het hoofddoel is de front-end voorzien van alle data dat hij dan kan loggen.
 
 * **Feedback drone ivm positie en scanstatus opvangen:** controleflows zorgen ervoor dat de drone correct wordt aangestuurd
  eens het vliegpad berekend is en de drone aan het vliegen is:
    * Met de positie gaat men na of men al dan niet het volgende knooppunt mag opsturen of niet, afhankelijk of de drone op het knooppunt ervoor staat.
    * Met scanned zal (analoog) het volgende knooppunt pas worden opgestuurd wanneer de drone ook meldt dat hij klaar is 
    met scannen. Er wordt ook een productobject van de drone meegegeven, dat wordt weggeschreven naar de database. (PUT of POST)
    
  * **Datasubscriptions instellen**:  Of bepaalde data van de drone via de websocket mag binnen komen of niet, 
  wordt met http requests opgevangen in Node-RED, die subscriptions aan of uit zet. Dit wordt bij de server zelf opgevangen om netwerkverkeer te verminderen
  
 
 ## Tekortkomingen / mogelijke uitbreidingen
 
 * In Node-RED kan er meer statusinfo worden bijgehouden vb. of de drone aan het landen is vs of de drone gestopt is, zodat de front-end 
 ook meer (gepaste) alerts kan geven.
 * Het scanned feedback mechanisme laat enkel toe dat er exact 1 product wordt aangepast/opgeslagen, 
 omdat de drone dit productobject hier moet meegeven. Dit kan makkelijk opgelost worden door de flow te ontbinden in:
    * een flow waarop de drone de products stuurt (eventueel 1 voor 1 om zo 
    weinig mogelijk aanpassingen aan het hudige systeem te moeten doen) en zo de database aan past
    * een flow waarbij de drone zegt dat hij klaar is met scannen en dat Node-RED het volgende knooppunt op stuurt
 * Er wordt niet nagegaan of de drone het huidige pad wel daadwerkelijk volgt, enkel of hij op een knoopunt is toegekomen, 
 hiervoor is een extra flow nodig (MQTT input node), er staat al een code snippet in api/drones.js die zou kunnen worden gebruikt. 
 Deze flow moet wel die data nog in de front-end kunnen krijgen.
 * Meerdere drones worden door Node-RED niet ondersteund, tenzij hiervoor twee aparte backend processen (met brokers) runnen. 
 De huidige flows aanpassen om rekening te houden met een droneId zou een oplossing zijn, die alle flows aan past maar nergens anders impact op heeft.
 * Uiteraard zijn extra functionaliteiten en aanpassingen mogelijk door nieuwe flows te schrijven.
 