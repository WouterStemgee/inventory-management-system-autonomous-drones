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

## Server opstarten

Het enige dat moet gebeuren is het bestand api/bin/www uitvoeren via "node api/bin/www", 
dit zal zowel de express als de node-red opstarten.
In dit bestand staan ook enkele config parameters, zoals de poort waarop de backend server zal draaien, 
en de node-red settings. In app.js staan de andere API routes

## Overzicht directories en functies

* api: deze map bevat alle routerbestanden, die de api-calls van buiten opvangen, 
elk routerbestand stelt, op zich, de db voor welke deze routerbestanden zullen wijzigen. Zo zal maps.js
alles afhandelen wat met het ophalen/aanpassen van magazijnen heeft te maken.
    * api/bin bevat het uitvoerbestand om de backend server op te starten, dit gebeurt dus met
        "node api/bin/www"
    * api/config en api/controller dienen voor authenticatie na te gaan op de api-calls
    
* database: de DAO objecten die via mongoose data opvragen/aanpassen van de db. 
Ook bevat dit de modellen die door mongoose gebruikt worden om na te gaan of objecten die u wenst 
op te slaan, geldige objecten zijn.

* nodered: in lib/flows staan de opgeslagen flows, die je in de node-red editor kan importeren en opzetten.
Geëxporteerde flows komen ook hierin terecht.

* pathfinder: Bevat het A* algoritme, ASter.js is het hoofdbestand dat door API-calls en app.js gebruikt wordt om paden 
te berekenen, de rest is intern. Legacy bevat het oude dijkstra algoritme

* test: Om de server te testen wordt het bestand testAPI.js voorzien, waarmee alle calls getest worden.

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
---
* drones.js:
    * api/drones [GET|POST]
    * api/drones/{droneId} [GET|PUT|DELETE]
    * api/drones/collision [POST]

api/drones/collision wordt niet gebruikt, het was de bedoeling om zo de drone tijdens het pad te monitoren
 of hij al dan niet af wijkt van het vliegpad. Dit wordt veel beter met een websocket gedaan.
 ---
 
 Wordt gebruikt om het beste vliegpad te genereren en op te sturen 
 
 * flightpath.js:
    * api/flightpath [POST]
    


---

Gebruikt voor authenticatie

* users.js
 ---
 
 ## Node-RED
 
 In deze sectie wordt vooral uitgelegd hoe de node-red als een extra laag bovenop express ligt, en hoe interactie tussen de front-end en de backend zo verloopt. Ook zullen de flows worden onderverdeeld en uitgelegd
 
 * zoals eerder vermeld komen calls op /api/... automatisch terecht op express
 * /red/... calls komen terecht in Node-RED, Node-RED kan echter dan zelf soms nog een call doen op /api, dat dus bij express terecht komt.
 Dit moet soms worden gedaan om zo de data ook in Node-RED beschikbaar te hebben zonder daarvoor veel extra te moeten voorzien.
 
 Een belangrijk voorbeeld daarvan is het berekenen van een optimaal vliegpad, deze functie bevindt zich in de express server. Maar Node-RED moet hierover ook beschikken om de drone te kunnen aansturen.
 De beste optie is om Node-RED de aanvraag door te laten sturen en zelf ook het antwoord van express bij te houden.
 
 
  
 