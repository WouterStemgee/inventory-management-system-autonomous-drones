# Structuur project

## web-ui

Bevat de volledige front-end, dit is in angular ontwikkeld. 

## backend

Bevat de volledige back-end, dit is in express en node.js ontwikkeld. Het bevat de broncode van de express REST API, 
alsook het dao object dat connectie maakt met de database. Het A* algoritme is hier ook terug te vinden.
Ook Node-RED bevindt zich hier en is ingebed in de express applicatie.

## drone mockup node

Dit is de huidige mockup drone, geschreven in node.js

## drone mockup 

Dit is de oude python drone, waarvan we zijn afgestapt door een probleem door de drone met verschillende threads te laten werken. 
Dit hebben we verholpen met de nieuwe node mockup, die vanaf de grond compleet o
pnieuw moest opgebouwd zorden om het probleem te fixen, deze draait dan in 1 while lus. 
