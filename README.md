# Inventory Management System using Autonomous Drones

## Indeling

- Analyse: Hier komen de uiteindelijke verslagen en uml diagrammen terecht, ook voor onszelf staan hier enkele handige afbeeldingen/links naar artikels die bepaalde technologieën uitleggen, die we plannen te gebruiken. Voor een duidelijker overzicht van de diagrammen + uitleg wordt verwezen naar de wiki/analyse.

- Data: Dit is het logbestand van de werkelijke drone, omgevormd naar csv-bestanden. Deze zullen pas in een latere sprint worden gebruikt.

- Docker: Hierin draaien de back-end server en de database waarmee ze communiceert.

- Logboeken

- Presentaties: Hierin komen de gebruikte ppt's

- Project: Hier staat de volledige applicatie, deze bestaat uit een front-end webapplicatie, en een back-end server die communiceert met de (toekomstige) drone en data op haalt en weg schrijft naar de database. De webapp is geschreven in het Angular framework, en de server in Express. Beiden maken gebruik van de Node Package Manager.

- Verslag: Bevat het eindverslag

## De applicatie laten uitvoeren
Om de applicatie te gebruiken zijn er 2 mogelijkheden. 
- Via de [website](https://bpvop4.ugent.be:8081/) om de applicatie in werking te zien. Hiervoor is er wel een vpn verbinding nodig met de UGent server, [hier](https://helpdesk.ugent.be/vpn/asa.php) staat beschreven hoe dit moet.
- Door de onderdelen zelf locaal te draaien. 

### Zelf lokaal laten uitvoeren:
Om de webapplicatie lokaal te testen zijn er een aantal vereisten.
Namelijk:
- De broncode moet gedownload worden zodat deze lokaal beschikbaar is.
- MongoDB moet geïnstalleerd worden en de database locatie moet worden aangemaakt.
- Node.js en een Node Package Manager die automatisch met Node.js geïnstalleerd wordt.
- Angular, Express en andere modules moeten correct geïnstalleerd worden.
- Node-RED.
- De Mosquitto broker.
- Om de broncode lokaal beschikbaar te maken, moet de GitHub repository gecloned worden. Hiervoor navigeert de gebruiker via een browser naar de hoofdpagina van de repository. In dit geval is dat dus https://github.ugent.be/bp-vop-2019/drone1. Op deze pagina klikt men op de ‘Clone or download’ knop waarna men 2 opties heeft. Men kan op download ZIP klikken om vervolgens het ZIP-bestand uit te pakken in een locatie naar keuze of men maakt gebruik van de clone URL en Git Bash. Bij Git Bash verandert men de huidige working directory naar een locatie naar keuze en kan men de GitHub repository downloaden via het git clone commando. Hier is dit dus git clone https://github.ugent.be/bp-vop2019/drone1.git. Nu is de broncode lokaal beschikbaar.
- MongoDB is beschikbaar via https://www.mongodb.com/download-center/community. Op deze pagina selecteert men de versie en het besturingssysteem naar keuze. Men kiest best voor de recentste versie en download het MongoDB Server bestand. Tijdens deze installatie wordt aangeraden om de standaard instellingen te behouden. Naast MongoDB Server zal dit ook MongoDB Compass installeren, dit is een handige tool om connectie te maken met de database en deze ook te visualiseren. Collecties kunnen met MongoDB Compass ook aangesproken worden via CRUD operaties. Vervolgens moet de map ‘Directory waar MongoDB is geïnstalleerd’/data/db (of /data/db op linux) worden aangemaakt. Voor de meeste Windows gebruikers zal dit dus C:/data/db zijn. Hierin zal MongoDB zijn collecties bewaren. Indien de gebruiker een andere map locatie wenst te gebruiken, moet de gebruiker bij het runnen steeds de optie --bpath met als argument het gewenste pad mee geven.
- Node.js is een run-time environment dat alles bevat om de Javascript code van dit project uit te voeren. Node.js wordt ook gebruikt voor het installeren van Angular en Express. Node.js kan geïnstalleerd worden door naar https://nodejs.org/en/download/ te surfen en vervolgens de correcte installer te downloaden. Voor de meeste gebruikers zal dit de Windows Installer zijn onder het LTS tabblad. Tijdens deze installatie wordt aangeraden om de standaard instellingen te behouden.
- Vervolgens kunnen alle bijhorende modules waaronder ook Angular en Express geïnstalleerd worden. Hiervoor moet de gebruiker een CMD-venster openen en naar de correcte folder locatie navigeren. Eenmaal de gebruiker naar ~/project/backend/management-server genavigeerd is, moet hij het commando npm install uitvoeren. Zo worden de nodige afhankelijkheden voor de back-end automatisch geïnstalleerd. Na afloop doet de gebruiker hetzelfde maar nu navigeert hij eerst naar de folder ~/project/web-ui/drone-control-center. Nu worden de afhankelijkheden van de front-end automatisch geïnstalleerd.
- Om de mosquitto broker, die voor de communicatie tussen de drone en de webapplicatie staat, te installeren surft de gebruiker naar https://mosquitto.org/download/ en selecteert deze de correcte installer. Voor de meeste gebruikers zal dit de windows-x64.exe zijn onder Binary Installation. Tijdens deze installatie wordt aangeraden om de standaard instellingen te behouden.

Nu alle onderdelen correct geïnstalleerd zijn, kan de gebruiker de webapplicatie opstarten door de verschillende services op te starten. Hiervoor moet de gebruiker:
- De front-end te starten door naar de folder ~/project/web-ui/drone-control-center te navigeren in een CMD-venster. Vervolgens voert men het ng serve commando uit.
- De back-end te starten door naar de folder ~/project/web-ui/drone-control-center te navigeren in een CMD-venster en vervolgens het nodemon api/bin/www commando uit te voeren.
- De database kan gestart worden door in een CMD-venster te navigeren naar de installatie folder van MongoDB en vervolgens naar de folder ~/Server/4.0/bin. In deze map voert men het mongod commando uit.
- Als laatste start men de mosquitto broker door opnieuw in een CMD-venster te navigeren naar de mosquitto folder en hier het commando mosquitto -v uit te voeren. Door via een browser naar keuze te navigeren naar http://localhost:4200/dashboard kan de gebruiker de webapplicatie uittesten. Men kan de Node-RED flows bekijken en eventueel aanpassen door naar http://localhost:3000/editor te surfen. 

## Unit Testen

Om de backend server te testen is een unit test geschreven met behulp van [mocha](https://mochajs.org/) en [chai](https://www.chaijs.com/). 
Deze test kan uitgevoerd worden door met van een shell naar ~/project/backend/management-server te navigeren en het commando npm test uit te voeren. Hiermee wordt het testbestand ~/project/backend/management-server/test/testAPI.js uitgevoerd. 
