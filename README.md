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
- Door de onderdelen zelf lokaal te draaien. 

### Zelf lokaal laten uitvoeren:
#### Installatiehandleiding lokaal en uitvoeren
De gebruiker kan de webapplicatie lokaal testen of deze via de projectwebsite bereiken. De projectwebsite is in de voetregel of op het voorblad te vinden.

Om de webapplicatie lokaal te testen zijn er een aantal vereisten.
Namelijk: 
•	De broncode moet gedownload worden zodat deze lokaal beschikbaar is.
•	MongoDB moet geïnstalleerd worden en de database locatie moet worden aangemaakt. Minimum versie 4.0
•	Node.js en een Node Package Manager die automatisch met Node.js geïnstalleerd wordt. Minimum versie 10.15.1
•	Angular, Express en andere modules moeten correct geïnstalleerd worden.
Minimum versie 4.16.0 voor Express en versie 7.3.2 voor Angular
•	Node-RED. Minimum versie 0.20.3
•	De Mosquitto broker. Minimum versie 1.5.8

-	Om de broncode lokaal beschikbaar te maken, moet de GitHub repository gecloned worden. Hiervoor navigeert de gebruiker via een browser naar de hoofdpagina van de repository. In dit geval is dat dus https://github.ugent.be/bp-vop-2019/drone1.  Op deze pagina klikt men op de ‘Clone or download’ knop waarna men twee opties heeft. Men kan op download ZIP klikken om vervolgens het ZIP-bestand uit te pakken in een locatie naar keuze of men maakt gebruik van de clone URL en Git Bash.  Bij Git Bash verandert men de huidige working directory naar een locatie naar keuze en kan men de GitHub repository downloaden via het git clone commando. Hier is dit dus git clone https://github.ugent.be/bp-vop-2019/drone1.git. Nu is de broncode lokaal beschikbaar.

-	MongoDB is beschikbaar via https://www.mongodb.com/download-center/community. Op deze pagina selecteert men de versie en het besturingssysteem naar keuze. Voor linux is het aangeraden om de package manager te gebruiken om MongoDB te installeren. Men kiest best voor de recentste versie en download het MongoDB Server bestand. Tijdens deze installatie wordt aangeraden om de standaard instellingen te behouden. Naast MongoDB Server zal dit ook MongoDB Compass installeren, dit is een handige tool om connectie te maken met de database en deze ook te visualiseren. Collecties kunnen met MongoDB Compass ook aangesproken worden via CRUD operaties. Vervolgens moet de map ‘Directory waar MongoDB is geïnstalleerd’/data/db (of /data/db op linux) worden aangemaakt. Voor de meeste Windows gebruikers zal dit dus C:/data/db zijn. Hierin zal MongoDB zijn collecties bewaren. Indien de gebruiker een andere map locatie wenst te gebruiken, moet de gebruiker bij het runnen steeds de optie --bpath met als argument het gewenste pad mee geven.

-	Node.js is een run-time environment, dit betekent dat het alle onderdelen bevat om de Javascript code van dit project te kunnen uit te voeren. Node.js wordt ook gebruikt voor het installeren van Angular en Express. Node.js kan geïnstalleerd worden door naar https://nodejs.org/en/download/ te surfen en vervolgens de correcte installer te downloaden. Voor de meeste gebruikers zal dit de Windows Installer zijn onder het LTS tabblad. Tijdens deze installatie wordt aangeraden om de standaardinstellingen te behouden. Voor linux is het aangeraden om de package manager te gebruiken om Node.js te installeren.

-	Vervolgens kunnen alle bijhorende modules waaronder ook Angular en Express geïnstalleerd worden. Hiervoor moet de gebruiker een CMD-venster openen en naar de folder locatie navigeren waar hij het project heeft opgeslagen. Eenmaal de gebruiker naar /project/backend/management-server genavigeerd is, moet hij het commando npm install uitvoeren. Zo worden de nodige afhankelijkheden voor de back-end automatisch geïnstalleerd. Na afloop doet de gebruiker hetzelfde maar nu navigeert hij eerst naar de folder /project/web-ui/drone-control-center. Nu worden de afhankelijkheden van de front-end automatisch geïnstalleerd. Indien men ervoor kiest om ook de mockup drone te gebruiken navigeert de gebruiker ook naar de folder /project/drone-mockup-node en voert ook hier het npm install commando uit

-	Om de mosquitto broker, die voor de communicatie tussen de drone en de webapplicatie staat, te installeren surft de gebruiker naar https://mosquitto.org/download/ en selecteert deze de correcte installer. Voor de meeste gebruikers zal dit de windows-x64.exe zijn onder Binary Installation. Tijdens deze installatie wordt aangeraden om de standaard instellingen te behouden. 

 
#### Uitvoeren
Nu alle onderdelen correct geïnstalleerd zijn, kan de gebruiker de webapplicatie opstarten door de verschillende services op te starten. Hiervoor moet de gebruiker:
-	De front-end te starten door naar de folder /project/web-ui/drone-control-center te navigeren in een CMD-venster. Vervolgens voert men het ng serve commando uit.
-	De back-end te starten door naar de folder /project/backend/management-server te navigeren in een CMD-venster en vervolgens het npm start commando uit te voeren.
-	De mockup drone kan op dezelfde manier gestart worden. Navigeer hiervoor naar /project/drone-mockup-node in een CMD-venster en voer vervolgens het npm start commando uit.
-	De database kan gestart worden door in een CMD-venster te navigeren naar de installatie folder van MongoDB en vervolgens naar de folder /Server/4.0/bin. In deze map voert men het mongod commando uit. 
-	Als laatste start men de mosquitto broker door opnieuw in een CMD-venster te navigeren naar de mosquitto folder en hier het commando mosquitto -v uit te voeren.
-	Bij het eerste gebruik moet ook eerst Node-RED worden geconfigureerd, hiervoor wordt verwezen naar 6.3.

Door via een browser naar keuze te navigeren naar http://localhost:4200/dashboard kan de gebruiker de webapplicatie uittesten. Men kan de Node-RED flows bekijken en eventueel aanpassen door naar http://localhost:3000/editor te surfen. 
 
### Installatiehandleiding Docker
De volledige webapplicatie kan ook op Docker gedeployed worden. Tijdens het project was het dan ook de bedoeling om aan het einde van elke sprint een werkende eindeversie te hebben op Docker. Onze versie is te vinden op http://bpvop4.ugent.be:8081/.

Om de webapplicatie op Docker te deployen werd er een server voorzien samen met een gebruikersnaam, wachtwoord en 2 poorten. Voor ons was dit: 
•	Server: bpvop4
•	Gebruikersnaam: drone1
•	Wachtwoord: Drone1_9523
•	Poorten: 8081 en 8082

Om vervolgens de applicatie online te zetten open je lokaal een shell en navigeert u naar de root directory in de lokale git repository (/drone1). Vervolgens voert u het volgende commando uit om alle inhoud te kopiëren naar de remote server: scp -r .\docker drone1@bpvop4.ugent.be:~/
Hierna opent u best een SSH-sessie in de shell om te controleren dat alle bestanden op de server geplaatst zijn via het ssh bpvop4.ugent.be -l drone1 commando. Om verbinding te maken met de remote server is het meegegeven wachtwoord noodzakelijk. Vervolgens kan de Docker opgestart worden en is de webapplicatie gedeployed op Docker.

 
### Node-RED configuratie voor eerste gebruik
Vooraleer een gebruiker de webapplicatie kan gebruiken, moet deze de Node-RED flows deployen. Nadat de gebruiker de webapplicatie heeft uitgevoerd, moet deze op de Node-RED knop drukken. Vervolgens haalt de gebruiker alle flows op door via de extra opties   naar Import en vervolgens naar Library te gaan en hier elke flow importeert. 
Nadat deze geïmporteerd zijn moet de gebruiker controleren of de Configuration nodes correct zijn ingesteld. Zorg ervoor dat er per flow slechts 1 mosquitto MQTT-broker aanwezig is en bij de ‘dronedata opsturen met websocket’ slechts 1 /red/ws/data websocket-listener is.
Vervolgens moet elke MQTT-node gecontroleerd worden op de correcte broker geselecteerd is zoals op Figuur 7 in het verslag. Analoog moet het correcte pad geselecteerd zijn bij de Websocket-node.
Indien de webapplicatie gedeployed is op Docker moet de gebruiker bij elke http request node de localhost in de URL vervangen door de correcte server waarop de back-end draait. Voor ons was dit dus bpvop4.ugent.be:8082.
Hierna moet de gebruiker enkel nog op de rode Deploy knop drukken zoals te zien is op Figuur 6 in het verslag. Dit zal de Node-RED server opstarten en is de webapplicatie klaar voor gebruik.

### Gebruikershandleiding
Bij het surfen naar de website moet de gebruiker moet zich eerst registreren of inloggen met een geregistreerd account. Indien de webapplicatie lokaal wordt gebruikt, is men vrij om zelf een account aan te maken. Indien men de webapplicatie via de projectwebsite raadpleegt, dient men in te loggen via het admin account om alle functies te gebruiken. Het admin account gebruikt als email: ‘admin@ugent.be’ en het wachtwoord is ‘roeliewoelie’. 

Vervolgens komt men op het dashboard scherm. Hierbij zal er een map ingeladen worden van de database of, indien deze leeg is, een nieuwe map worden aangemaakt. Via het dashboardscherm ziet men een plattegrond van het magazijn of grootwarenhuis met hierop de scanlocaties aangeduid via een blauwe cirkel en de obstakels via een rode rechthoek. Naast de scanlocaties en de obstakels wordt ook de huidige locatie van de drone aangeduid samen met zijn rotatie. Via de knoppen op de plattegrond kan men scanlocaties en obstakels toevoegen, scanlocaties en obstakels aanpassen of verwijderen, kan men een vliegroute tekenen en kan men het centrum van de map zich laten focussen op de locatie van de drone. 

Onder de map zijn er 4 tabbladen te vinden. Eén voor de drone data: hier kan men de naam, de radius, het batterij niveau, de positie, de snelheid, de acceleratie en de pitch, roll en yaw van de drone bekijken. 
In het tweede tabblad vindt de gebruiker de drone configuratie waar hij de naam en de radius van de drone kan configureren. Deze configuratie wordt nadien opgeslagen in de database. 
Op het derde tabblad kan men de sensoren van de drone aanzetten of uitschakelen. 
Het laatste tabblad bevat vervolgens nog enkele visuele grafieken waar de data van de drone visueel wordt voorgesteld.
Via de knoppen boven de plattegrond kan men de getekende vluchtroute valideren, de drone het pad laten afvliegen en de drone tijdens zijn vluchtroute laten pauzeren, terug verder laten vliegen of de drone volledig laten stoppen met het vliegen van zijn vluchtroute.

Links op het scherm kan men naast het dashboard de andere functionaliteiten van de webapplicatie bekijken. Het inventory scherm bevat een lijst met alle producten die gekoppeld zijn aan de huidige geselecteerde map. Hier kan een gebruiker met admin rechten ook producten aan toevoegen of deze weer verwijderen.
Via het Admin scherm kan een gebruiker met admin rechten kiezen om alle mappen en drones te verwijderen uit de database. 
En als laatste is er ook een Node-RED tabblad voorzien zodat een gebruiker de flows kan bekijken en aanpassen.

In de rechterbovenhoek vindt de gebruiker 3 knoppen waarmee hij een plattegrond kan selecteren, zijn profiel kan bekijken en waarmee hij kan uitloggen uit de webapplicatie.


## Testen

### Unit testen
Om de verschillende API calls voor het toevoegen, aanpassen en verwijderen van de verschillende mappen, producten en droneconfiguraties en het valideren en corrigeren van een vluchtroute is een unit test meegegeven. Met behulp van Mocha en Chai kan iemand gemakkelijk de back-end testen. Deze test kan uitgevoerd worden door via een CMD-venster naar /project/backend/management-server te navigeren en het commando npm test uit te voeren. Hiermee wordt het testbestand /project/backend/management-server/test/testAPI.js uitgevoerd. Voor deze testen moet de database server zijn opgestart.

Bij het ontwikkelen werd vooral getest met het programma Postman waarmee de verschillende endpoints van express kunnen worden aangesproken. Eerst werd er een map opgeslagen, vervolgens kunnen er verschillende GET-operaties worden uitgevoerd op de geëmbedde objecten om te zien om deze wel correct werden opgeslagen, en het express endpoint werkt. Tot slot kan dan worden getest of deze objecten kunnen worden aangepast door PUT en DELETE operaties. Bij PUT moet natuurlijk de body van de http-request wel correct worden ingevuld met de vervangende data.

### Invoercontrole
Elk invoerveld is voorzien van een controle zodat er in velden waar enkel numerieke waardes mogen ingevoerd worden enkel nummers kunnen ingevoerd worden. Ook wanneer er geen waarde ingevoerd wordt, wordt er een correcte foutboodschap op het scherm getoond.

 
### Integration testen (manueel)
#### Testen van de vliegroutes
Om te testen of de vliegroutes correct berekend worden, kan de gebruiker een aantal waypoints aanduiden op de kaart. Onder het Flightpath Options tabblad bij het dashboard kan de gebruiker elke optie testen. Zo kan er nagegaan worden of paden door een obstakel worden afgekeurd indien de Validate path optie aanstaat. Dit pad zou wel moeten goedgekeurd worden indien de “Don’t validate path” optie is geselecteerd of goedgekeurd en aangepast worden indien de optie “Validate and correct path” was geselecteerd. Om de Calculate optimal path optie te testen selecteert de gebruiker het beste verschillende scanlocaties in een volgorde dat zeker niet de beste is, dit is bijvoorbeeld eerst een locatie ver van de drone, gevolgd door een locatie dicht bij de drone en opnieuw een locatie ver van de drone. Bij het klikken van de Validate knop moet de volgorde van de waypoints zijn aangepast. Met de Return to start optie zou het gevalideerde pad dezelfde begin- als eindlocatie moeten hebben.

#### Testen van de Sensor Configuratie
Door onder het Sensor Configuration tabblad bij het dashboard verschillende sensoren uit te schakelen en vervolgens in het Drone Data venster te kijken of de uitgeschakelde sensoren hun data verdwenen is, kan de gebruiker het subscriben op de verschillende MQTT-topics testen. Indien de gebruiker de sensoren terug aanschakelt, zou de data opnieuw moeten verschijnen.

#### Database testen
Op het inventory venster kan de gebruiker controleren welke producten er al reeds in de database zouden moeten zitten. De gebruiker kan hier ook testen of de connectie met de database correct is opgesteld door een product toe te voegen aan deze lijst en vervolgens manueel in de database te kijken of het nieuwe product is toegevoegd. Dit kan bijvoorbeeld gecontroleerd worden door een API call. Meer uitleg kan gevonden worden in de readme over het Inventory Management Server onder drone1/project/backend/README.md

#### Usability testen
Om de webapplicatie op gebruiksvriendelijkheid te testen, heeft een ander team gedurende 5 tot 10 minuten de webapplicatie getest. Hierbij werd duidelijk dat het inladen van de correcte flows in Node-RED niet voor de hand ligt. 
Wanneer de gebruiker een waypoint plaatst dat te dicht bij een obstakel staat toont deze een bericht dat de vliegroute ongeldig is. Voor de gebruiker was dit niet helemaal duidelijk dat het probleem lag aan het feit dat de waypoint te dicht bij de muur lag. De leaflet kaart bevat vele knoppen, maar doordat deze veel informatie tonen indien de gebruiker over deze knoppen bij mouseover veel informatie tonen, is er weinig documentatie nodig over dit onderdeel van de webapplicatie.
Na het dashboard heeft de gebruiker weinig bijkomende informatie nodig omdat het inventory scherm geen ingewikkelde informatie of functies bevat. 

## Meer info

Voor meer info wordt verwezen naar de verschillende readme's in de verschillende mappen van het project. 
* In de map project is er een readme voorzien die kort de verschillende componenten aan haalt.
* Bij project/backend vind men alle info over de backend. Het bevat een overzicht van de verschillende mappen, de API-endpoints van express en info over de vier node-red flows, alsook tekortkomingen en mogelijke uitbreidingen.
* Bij project/web-ui ontbreekt er momenteel nog een readme van de front-end.

Sommige delen de code zijn ook gedocumenteerd.
