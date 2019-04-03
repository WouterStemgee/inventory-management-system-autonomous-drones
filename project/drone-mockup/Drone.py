import json
import xml.etree.ElementTree as et
import paho.mqtt.client as mqtt
import time
import math
import time

class Drone:
    def __init__(self,length,width=0):
        self.length = length
        if(width==0):
            self.width = length
        self.battery = 100
        # positie array
        self.position = [1,1,1] # xcoord, ycoord en zcoord, nog geen getters en setters
        self.acceleration = [None, None, None]
        #self.speedX = None
        #self.speedY = None
        #self.speedZ = None
        self.speed = [None,None,None]
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
            self.speed[0] = s
        else:
            self.speed[0] = 0

    def get_speedX(self):
        return self.speed[0]

    def set_speedY(self,s):
        if s >= 0:
            self.speed[1] = s
        else:
            self.speed[1] = 0

    def get_speedY(self):
        return self.speed[1]

    def set_speedZ(self,s):
        if s >= 0:
            self.speed[2] = s
        else:
            self.speed[2] = 0

    def get_speedZ(self):
        return self.speed[2]

    def get_accelX(self):
        return self.acceleration[0]

    def set_accelX(self,a):
        if a >= 0:
            self.acceleration[0] = a
        else:
            self.acceleration[0] = 0

    def get_accelY(self):
        return self.acceleration[1]

    def set_accelY(self,a):
        if a >= 0:
            self.acceleration[1] = a
        else:
            self.acceleration[1] = 0

    def get_accelZ(self):
        return self.acceleration[2]

    def set_accelZ(self,a):
        if a >= 0:
            self.acceleration[2] = a
        else:
            self.acceleration[2] = 0

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

    def vliegHorizontaal(self,x,y):
        if self.speed[0] == 0:
            self.speed[0] = 3
        self.speed[2] = 0  # want je beweegt niet
        self.speed[1] = (math.fabs(y - self.position[1]) / math.fabs(x - self.position[0])) * self.speed[0]
        # zie berekeningen op blad
        tijd = 0.0 + (math.fabs(x - self.position[0]) / self.speed[0])
        t = 0
        initieelX = self.position[0]
        initieelY = self.position[1]
        while t <= tijd:
            # misschien ga je niet exact op tijd uit komen op het einde
            if x > initieelX and y > initieelY:
                self.position[0] = initieelX + (self.speed[0] * t)
                self.position[1] = initieelY + (self.speed[1] * t)
            elif x < initieelX and y > initieelY:
                self.position[0] = initieelX - (self.speed[0] * t)
                self.position[1] = initieelY + (self.speed[1] * t)
            elif x > initieelX and y < initieelY:
                self.position[0] = initieelX + (self.speed[0] * t)
                self.position[1] = initieelY - (self.speed[1] * t)
            elif x < initieelX and y < initieelY:
                self.position[0] = initieelX - (self.speed[0] * t)
                self.position[1] = initieelY - (self.speed[1] * t)
            elif x == initieelX:
                if y < initieelY:
                    self.position[1] = initieelY - (self.speed[1] * t)
                elif y > initieelY:
                    self.position[1] = initieelY + (self.speed[1] * t)
            elif y == initieelY:
                if x < initieelX:
                    self.position[0] = initieelX - (self.speed[0] * t)
                elif x > initieelX:
                    self.position[0] = initieelX + (self.speed[0] * t)
            print("op tijdstip: ", t, " x: ", self.position[0], " y:", self.position[1], " z:", self.position[2])
            t = t + 0.05
            round(t,2)  # dit geeft een hoop slecht afgeronde komma getallen door beperkingen in de binaite voorstelling
            time.sleep(0.05)
        self.position[0] = x
        self.position[1] = y
        print("op tijdstip: ", tijd, " x: ", self.position[0], " y:", self.position[1], " z:", self.position[2])
        self.speed[0] = 0
        self.speed[1] = 0
        return tijd

    def vliegVerticaal(self,z,tijd):
        print("verticaal vliegen")
        if(z != self.position[2]):
            if self.speed[2] == 0:
                self.speed[2] = 3
            tijd2 = math.fabs(z-self.position[2])/self.speed[2]
            t = 0
            initieelZ = self.position[2]
            while t <= tijd2:
                if (z > self.position[2]):
                    self.position[2] = initieelZ + self.speed[2]*t
                elif z < self.position[2]:
                    self.position[2] = initieelZ - self.speed[2]*t
                print("op tijdstip: ", t+tijd, " x: ", self.position[0], " y:", self.position[1], " z:", self.position[2])
                t = t + 0.05
                round(t,2)
                time.sleep(0.05)
            self.position[2] = z
            print("op tijdstip: ", tijd+tijd2, " x: ", self.position[0], " y:", self.position[1], " z:", self.position[2])
            self.speed[2] = 0


    def vliegNaar(self,x,y,z):
        if not (x == self.position[0] and y == self.position[1] and z == self.position[2]):
            # als je op zelfde positie blijft doe je niets
            tijd = self.vliegHorizontaal(x,y)
            if z != self.position[2]:
                # dan moet je ook nog verticaal vliegen
                self.vliegVerticaal(z,tijd)

    def scan(self):
        print("item geskand met waarde 4000")
        return 4000

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