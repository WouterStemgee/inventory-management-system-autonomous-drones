# Inventory Management System using Autonomous Drones

## Indeling

- Analyse: Hier komen de uiteindelijke verslagen en uml diagrammen terecht, ook voor onszelf staan hier enkele handige afbeeldingen/links naar artikels die bepaalde technologieën uitleggen, die we plannen te gebruiken. Voor een duidelijker overzicht van de diagrammen + uitleg wordt verwezen naar de wiki/analyse.

- Data: Dit is het logbestand van de werkelijke drone, omgevormd naar csv-bestanden. Deze zullen pas in een latere sprint worden gebruikt.

- Docker: Hierin draaien de back-end server en de database waarmee ze communiceert.

- Logboeken

- Project: Hier staat de volledige applicatie, deze bestaat uit een front-end webapplicatie, en een back-end server die communiceert met de (toekomstige) drone en data op haalt en weg schrijft naar de database. De webapp is geschreven in het Angular framework, en de server in Express. Beiden maken gebruik van de Node Package Manager.

## De applicatie laten uitvoeren
#### (release gebruiken, nog invullen)


### Zelf lokaal laten uitvoeren:
#### Benodigdheden:

- [Node.js](https://nodejs.org/en/)
- Node Package Manager (wordt automatisch met Node.js geïnstalleerd)
- [Mongodb Server](https://www.mongodb.com/download-center/community), voor instalatie wordt verwezen naar de wiki

#### Uitvoeren:

Voor de volledige functionaliteit te bekomen moeten er drie dingen gebeuren:
1. De database opzetten. (zie opnieuw de wiki)

2. De backend server laten draaien. Dit gebeurt door via de node.js shell te navigeren naar ~/project/backend/management-server en daar "node api\bin\www" uit te voeren.

3. De frontend (Angular) opzetten, analoog wordt genavigeerd naar ~/project/web-ui/drone-control-center in een tweede shell en wordt het commando "ng serve" uitgevoerd.

**Belangrijk**, bij de eerste keer moeten bij stappen 2 en 3 eerst het commando "npm install" worden uitgevoerd wanneer de shell in de juiste folder zit, zo worden de nodige afhankelijkheden (o.a Angular) voor het project automatisch geïnstalleerd.

Vervolgens zal de site te vinden zijn op (http://localhost:4200), voor de REST api te testen kan men de verschillende end points raadplegen via de wiki.
