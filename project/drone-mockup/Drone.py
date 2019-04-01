import json
import xml.etree.ElementTree as et
import paho.mqtt.client as mqtt
import time
import math

class Drone:
    def __init__(self,length,width=0):
        self.length = length
        if(width==0):
            self.width = length
        self.battery = 100
        # positie array
        self.position = [1,1,1] # xcoord, ycoord en zcoord, nog geen getters en setters
        #self.accelH = None
        #self.accelV = None
        self.accelX = None
        self.accelY = None
        self.accelZ = None
        # je hebt een horizontale en een verticale versnelling en snelheid
        #self.speedH = None
        #self.speedV = None
        self.speedX = None
        self.speedY = None
        self.speedZ = None
        self.jaw = None
        self.pitch = None
        self.roll = None

    def berekenAfstandHorizontaal(self,x,y):
        huidigeX = self.position[0]
        huidigeY = self.position[1]
        if huidigeX == x:
            # rechte lijn naar boven
            afstand = math.fabs(y - huidigeY)
        elif huidigeY == y:
            afstand = math.fabs(x - huidigeX)
        else:
            factor = ((x - huidigeX) * (x - huidigeX)) + ((y - huidigeY) * (y - huidigeY))
            afstand = math.sqrt(factor)
        return afstand

    def berekenAfstandVerticaal(self,z):
        huidigeZ = self.position[2]
        return z-huidigeZ

    def berekenAfstand(self,x,y,z):
        huidigeX = self.position[0]
        huidigeY = self.position[1]
        huidigeZ = self.position[2]
        afstand = None
        if (z == None or z == huidigeZ):
            # dan blijf je dus in hetzelfde vlak
            afstand = self.berekenAfstandHorizontaal(x,y)
        else:
            factor1 = self.berekenAfstandHorizontaal(x,y)
            factor2 = self.berekendAfstanVerticaal(z)
            afstand = math.sqrt((factor1 * factor1) + (factor2*factor2))
        return afstand

    # moet nog eens aangepast
    def berekenTijdHorizontaal(self,afstand):
        tijd = None
        if self.speedH == 0 and self.accelH == 0:
            print("Bij het berekenen van de tijd (H) was zowel de snelheid als de versnelling 0")
            tijd = -1
        elif self.speedH == 0:
            tijd = math.sqrt(2*afstand/self.accelH)
        elif self.accelH == 0:
            tijd = afstand/self.speedH
        else:
            D = (self.speedH * self.speedH) - (2 * self.accelH * (-1) * math.fabs(afstand))
            if D < 0:
                print("error in berekening discriminant")
                return None
            elif D == 0:
                tijd = ((-1) * self.speedH + math.sqrt(D)) / (self.accelH)
            else:
                tijd1 = ((-1) * self.speedH + math.sqrt(D)) / (self.accelH)
                tijd2 = ((-1) * self.speedH - math.sqrt(D)) / (self.accelH)
                if tijd1 >= 0:
                    tijd = tijd1
                else:
                    tijd = tijd2
        return tijd

    # deze methode gaat er van uit dat er geen obstakels liggen onderweg naar het coordinaat
    # voorlopig wordt wordt er nog vanuit gegaan dat de drone op dezelfde hoogte ligt
    # en dat er niet schuin gevlogen kan worden
    def beweegNaarCoordinaat(self,x,y,z):
        if self.position[0] != x or self.position[1] != y:
            #afstand = self.berekenAfstand(x,y,z) # afstand kan kleiner zijn dan 0
            afstandHorizontaal = self.berekenAfstandHorizontaal(x,y)
            #afstandVerticaal = self.berekendAfstandVerticaal(z)
            # (a*t*t)/2 + v*t - abs(afstand) = 0 => hieruit de tijd halen die de drone er over gaat doen
            # en dan zo tijdens die tijd telkens de nieuwe x,y en z waarden berekenen voor die specifieke tijd
            tijd = self.berekenTijdHorizontaal(afstandHorizontaal)
            # de positie uitrekenen en printen met een frequentie van 50Hz
            huidigTijdstip = 0
            initieleX = self.position[0]
            initieleY = self.position[1]
            while huidigTijdstip <= tijd:
                if y == self.position[1]:
                    if x>=self.position[0]:
                        nieuwepositie = round(initieleX + (self.speedH*huidigTijdstip) + (self.accelH*huidigTijdstip*huidigTijdstip/2),2)
                    elif x <= self.position[0]:
                        nieuwepositie = round(initieleX - (self.speedH * huidigTijdstip) - (self.accelH * huidigTijdstip * huidigTijdstip / 2), 2)
                    #print("op tijdstip: ",huidigTijdstip)
                    #print("is de positie: ", nieuwepositie)
                    #print("")
                    self.position[0] = nieuwepositie
                    huidigTijdstip = huidigTijdstip + 0.25
                elif x == self.position[0]:
                    if y>=self.position[1]:
                        nieuwepositie = round(initieleY + (self.speedH*huidigTijdstip) + (self.accelH*huidigTijdstip*huidigTijdstip/2),2)
                    elif y<= self.position[1]:
                        nieuwepositie = round(initieleY - (self.speedH*huidigTijdstip) - (self.accelH*huidigTijdstip*huidigTijdstip/2),2)
                    #print("op tijdstip: ", huidigTijdstip)
                    #print("is de positie: ", nieuwepositie)
                    #print("")
                    self.position[1] = nieuwepositie
                    huidigTijdstip = huidigTijdstip + 0.25
                    #round(huidigTijdstip, 2)

    def giveInfoTest(self):
        payload = {
            'id': self.drone_id,
            'length': self.length,
            'width': self.width,
            'battery': self.battery
        }
        return json.dumps(payload)

    def get_jaw(self):
        return self.jaw

    def set_jaw(self,j):
        self.jaw = j

    def  get_pitch(self):
        return self.pitch

    def set_pitch(self,p):
        self.pitch = p

    def get_roll(self):
        return self.roll

    def set_roll(self,r):
        self.roll = r

    def get_xCoord(self):
        return self.position[0]

    def set_xCoord(self,x):
        if x >= 0:
            self.position[0] = x
        else:
            self.position[0] = 0

    def get_yCoord(self):
        return self.position[1]

    def set_yCoord(self,y):
        if y>=0:
            self.position[1] = y
        else:
            self.position[1] = 0

    def get_zCoord(self):
        return self.position[2]

    def set_zCoord(self,z):
        if z >= 0:
            self.position[2] = z
        else:
            self.position[2] = 0

    def set_speedX(self,s):
        if s >= 0:
            self.speedX = s
        else:
            self.speedX = 0

    def get_speedX(self):
        return self.speedX

    def set_speedY(self,s):
        if s >= 0:
            self.speedY = s
        else:
            self.speedY = 0

    def get_speedY(self):
        return self.speedV

    def set_speedZ(self,s):
        if s >= 0:
            self.speedZ = s
        else:
            self.speedZ = 0

    def get_speedZ(self):
        return self.speedZ

    def get_accelX(self):
        return self.accelX

    def set_accelX(self,a):
        if a >= 0:
            self.accelX = a
        else:
            self.accelX = 0

    def get_accelY(self):
        return self.accelY

    def set_accelY(self,a):
        if a >= 0:
            self.accelY = a
        else:
            self.accelY = 0

    def get_accelZ(self):
        return self.accelZ

    def set_accelZ(self,a):
        if a >= 0:
            self.accelZ = a
        else:
            self.accelZ = 0

    # getters en setters voor de variabelen van de drone

    def get_length(self):
        return self.length

    def set_length(self,lengte):
        if lengte >= 0:
            self.length = lengte
        else:
            self.length = 0

    def get_width(self):
        return self.width

    def set_width(self,width):
        if width >= 0:
            self.width = width
        else:
            self.width = 0

    def get_battery(self):
        return self.battery

    def set_battery(self,battrij):
        if battrij >=0:
            self.battery = battrij
        else:
            self.battery = 0

    def testProgramma(self):
        print("Print info drone: P")
        print("stel waardes in met: S")
        print("stop: Q")
        loop = True
        while loop:
            var = input("Geef commando in: ")
            if (var == "Q"):
                loop = False
            elif (var == "P"):
                print(self.giveInfoTest())
            elif (var == "S"):
                print("lengte: L")
                print("width: W")
                print("battery: B")
                print("xCoord: X")
                print("yCoord: Y")
                print("hoogte: H")
                print("accel: A")
                print("speed: S")

                var = input("geef letter waarde in: ")
                zin = var.split();
                letter = zin[0]
                waarde = zin[1]
                if (letter == "L"):
                    self.set_length(waarde)
                elif (letter == "W"):
                    self.set_width(waarde)
                elif (letter == "B"):
                    self.set_battery(waarde)
                elif (letter == "X"):
                    self.set_xCoord(waarde)
                elif (letter == "Y"):
                    self.set_yCoord(waarde)
                elif (letter == "H"):
                    self.set_hoogte(waarde)
                elif (letter == "A"):
                    self.set_accel(waarde)
                elif (letter == "S"):
                    self.set_speed(waarde)
                else:
                    print("geen juiste parameters")

    #def vliegNaar(self,x,y,z):
    #    if not (x == self.position[0] and y == self.position[1] and z == self.position[2]):
    #       if x != self.position[0] and self.speedX == 0:
    #            self.speedX = 5
    #        if y != self.position[1] and self.speedY == 0:
    #            self.speedY = 5
    #        if z != self.position[2] and self.speedZ == 0:
    #            self.speedZ = 3
    #        if z == self.position[2]: # dan zit je in een horizontaal vlak
    #            snelheid = math.sqrt((self.speedX*self.speedX)+(self.speedY*self.speedY))
    #            afstand = self.berekenAfstand(x,y,z)
    #            totaleTijd = afstand/snelheid
    #            tijd = 0
    #            while tijd <= totaleTijd:

    def vliegHorizontaal(self,x,y):
        if self.speedX == 0:
            self.speedX = 3
        self.speedZ = 0  # want je beweegt niet
        self.speedY = (math.fabs(y - self.position[1]) / math.fabs(x - self.position[0])) * self.speedX
        # zie berekeningen op blad
        tijd = 0.0 + (math.fabs(x - self.position[0]) / self.speedX)
        t = 0
        initieelX = self.position[0]
        initieelY = self.position[1]
        while t <= tijd:
            # misschien ga je niet exact op tijd uit komen op het einde
            if x > initieelX and y > initieelY:
                self.position[0] = initieelX + (self.speedX * t)
                self.position[1] = initieelY + (self.speedY * t)
            elif x < initieelX and y > initieelY:
                self.position[0] = initieelX - (self.speedX * t)
                self.position[1] = initieelY + (self.speedY * t)
            elif x > initieelX and y < initieelY:
                self.position[0] = initieelX + (self.speedX * t)
                self.position[1] = initieelY - (self.speedY * t)
            elif x < initieelX and y < initieelY:
                self.position[0] = initieelX - (self.speedX * t)
                self.position[1] = initieelY - (self.speedY * t)
            elif x == initieelX:
                if y < initieelY:
                    self.position[1] = initieelY - (self.speedY * t)
                elif y > initieelY:
                    self.position[1] = initieelY + (self.speedY * t)
            elif y == initieelY:
                if x < initieelX:
                    self.position[0] = initieelX - (self.speedX * t)
                elif x > initieelX:
                    self.position[0] = initieelX + (self.speedX * t)
            print("op tijdstip: ", t, " x: ", self.position[0], " y:", self.position[1], " z:", self.position[2])
            t = t + 0.05
            round(t,2)  # dit geeft een hoop slecht afgeronde komma getallen door beperkingen in de binaite voorstelling
        self.position[0] = x
        self.position[1] = y
        print("op tijdstip: ", tijd, " x: ", self.position[0], " y:", self.position[1], " z:", self.position[2])
        self.speedX = 0
        self.speedX = 0
        return tijd

    def vliegVerticaal(self,z,tijd):
        print("verticaal vliegen")
        if(z != self.position[2]):
            if self.speedZ == 0:
                self.speedZ = 3
            tijd2 = math.fabs(z-self.position[2])/self.speedZ
            t = 0
            initieelZ = self.position[2]
            while t <= tijd2:
                if (z > self.position[2]):
                    self.position[2] = initieelZ + self.speedZ*t
                elif z < self.position[2]:
                    self.position[2] = initieelZ + self.speedZ*t
                print("op tijdstip: ", t+tijd, " x: ", self.position[0], " y:", self.position[1], " z:", self.position[2])
                t = t + 0.05
                round(t,2)
            self.position[2] = z
            print("op tijdstip: ", tijd+tijd2, " x: ", self.position[0], " y:", self.position[1], " z:", self.position[2])
            self.speedZ = 0


    def vliegNaar(self,x,y,z):
        if not (x == self.position[0] and y == self.position[1] and z == self.position[2]):
            # als je op zelfde positie blijft doe je niets
            tijd = self.vliegHorizontaal(x,y)
            if z != self.position[2]:
                # dan moet je ook nog verticaal vliegen
                self.vliegVerticaal(z,tijd)

class DroneSerializer:
    def serialize(self,drone,format):
        serializer = self._get_serializer(format)
        return serializer(drone)

    def _get_serializer(self,format):
        if format == 'JSON':
            return self._serialize_to_json
        elif format == 'XML':
            return self._serialize_to_xml
        else:
            raise ValueError(format)

    def _serialize_to_json(self,drone):
        payload = {
            'id': Drone.drone_id,
            'length': Drone.length,
            'width': Drone.width,
            'battery': Drone.battery
        }
        return json.dumps(payload)

    def _serialize_to_xml(self,drone):
        drone_info = et.Element('Drone', attrib={'id': Drone.drone_id})
        length = et.SubElement(drone_info, 'length')
        length.text = Drone.length
        width = et.SubElement(drone_info, 'width')
        width.text = Drone.width
        battery = et.SubElement(drone_info, 'battery')
        battery.text = Drone.battery
        return et.tostring(drone_info, encoding='unicode')


drone = Drone(5)
drone.set_xCoord(1)
drone.set_yCoord(0)
drone.set_zCoord(10)
drone.set_speedX(0)
drone.set_speedY(0)
drone.set_speedZ(0)
drone.set_accelX(2)
drone.vliegNaar(6,6,20)
#afstand = drone.berekenAfstandHorizontaal(5,0)
#tijd = drone.berekenTijdHorizontaal(afstand)
#print("tijd: ",tijd)
#drone.beweegNaarCoordinaat(5,0)