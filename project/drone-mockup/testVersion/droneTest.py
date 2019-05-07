import paho.mqtt.client as mqtt
import time
import math
import time
import threading # het kan zijn dat python hier nog problemen op geeft aangezien je deze ook importeert in de simulator

class DroneTest:
    def __init__(self):
        self.battery = 100
        self.position = [1, 1, 1]  # xcoord, ycoord en zcoord
        self.speed = [None, None, None]
        self.length = None
        self.width = None
        self.acceleration = [None, None, None]
        self.jaw = None
        self.pitch = None
        self.roll = None

    # /////////Getters en setters ////////////////

    def get_xCoord(self):
        return self.position[0]

    def set_xCoord(self, x):
        if x >= 0:
            self.position[0] = x
        else:
            self.position[0] = 0

    def get_yCoord(self):
        return self.position[1]

    def set_yCoord(self, y):
        if y >= 0:
            self.position[1] = y
        else:
            self.position[1] = 0

    def get_zCoord(self):
        return self.position[2]

    def set_zCoord(self, z):
        if z >= 0:
            self.position[2] = z
        else:
            self.position[2] = 0

    def set_speedX(self, s):
        if s >= 0:
            self.speed[0] = s
        else:
            self.speed[0] = 0

    def get_speedX(self):
        return self.speed[0]

    def set_speedY(self, s):
        if s >= 0:
            self.speed[1] = s
        else:
            self.speed[1] = 0

    def get_speedY(self):
        return self.speed[1]

    def set_speedZ(self, s):
        if s >= 0:
            self.speed[2] = s
        else:
            self.speed[2] = 0

    def get_speedZ(self):
        return self.speed[2]

    def get_battery(self):
        return self.battery

    def set_battery(self, battrij):
        if battrij >= 0:
            self.battery = battrij
        else:
            self.battery = 0

    def get_jaw(self):
        return self.jaw

    def set_jaw(self, j):
        self.jaw = j

    def get_pitch(self):
        return self.pitch

    def set_pitch(self, p):
        self.pitch = p

    def get_roll(self):
        return self.roll

    def set_roll(self, r):
        self.roll = r

    def get_accelX(self):
        return self.acceleration[0]

    def set_accelX(self, a):
        if a >= 0:
            self.acceleration[0] = a
        else:
            self.acceleration[0] = 0

    def get_accelY(self):
        return self.acceleration[1]

    def set_accelY(self, a):
        if a >= 0:
            self.acceleration[1] = a
        else:
            self.acceleration[1] = 0

    def get_accelZ(self):
        return self.acceleration[2]

    def set_accelZ(self, a):
        if a >= 0:
            self.acceleration[2] = a
        else:
            self.acceleration[2] = 0

    def get_length(self):
        return self.length

    def set_length(self, lengte):
        if lengte >= 0:
            self.length = lengte
        else:
            self.length = 0

    def get_width(self):
        return self.width

    def set_width(self, width):
        if width >= 0:
            self.width = width
        else:
            self.width = 0

    # def set_client(self,c):
    #   self.client = c

    # ///////////////////////////////////////////////////

    def stop(self):
        self.Stop = True
        # even wachten om threads te laten stoppen??????????
        #while threading.activeCount() != 1:
        #    time.sleep(2)
        self.set_speedX(0)
        self.drone.set_speedY(0)
        self.drone.set_speedZ(0)
        self.drone.set_accelX(0)
        self.drone.set_accelY(0)
        self.drone.set_accelZ(0)
        self.drone.set_zCoord(0)

    def vliegHorizontaal(self, x, y):
        if self.speed[0] == 0:
            self.speed[0] = 100
        self.speed[2] = 0  # want je beweegt niet
        if x != self.position[0]:
            self.speed[1] = (math.fabs(y - self.position[1]) / math.fabs(x - self.position[0])) * self.speed[0]
        else:
            self.speed[1] = 0
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
            round(t,
                  2)  # dit geeft een hoop slecht afgeronde komma getallen door beperkingen in de binaite voorstelling
            time.sleep(0.05)
        self.position[0] = x
        self.position[1] = y
        print("op tijdstip: ", tijd, " x: ", self.position[0], " y:", self.position[1], " z:", self.position[2])
        self.speed[0] = 0
        self.speed[1] = 0
        return tijd

    def vliegVerticaal(self, z, tijd):
        print("verticaal vliegen")
        if (z != self.position[2]):
            if self.speed[2] == 0:
                self.speed[2] = 100
            tijd2 = math.fabs(z - self.position[2]) / self.speed[2]
            t = 0
            initieelZ = self.position[2]
            while t <= tijd2:
                if (z > self.position[2]):
                    self.position[2] = initieelZ + self.speed[2] * t
                elif z < self.position[2]:
                    self.position[2] = initieelZ - self.speed[2] * t
                print("op tijdstip: ", t + tijd, " x: ", self.position[0], " y:", self.position[1], " z:",self.position[2])
                t = t + 0.05
                round(t, 2)
                time.sleep(0.05)
            self.position[2] = z
            print("op tijdstip: ", tijd + tijd2, " x: ", self.position[0], " y:", self.position[1], " z:",self.position[2])
            self.speed[2] = 0

    def stijgOp(self):
        print("opstijgen")
        if (self.position[2]==0):
            if self.speed[2] == 0:
                self.speed[2] = 100
            z = 1500
            tijd2 = z / self.speed[2]
            t = 0
            initieelZ = self.position[2]
            while t <= tijd2:
                self.position[2] = initieelZ + self.speed[2] * t
                print("opstijgen " , "x: ", self.position[0], " y:", self.position[1], " z:",self.position[2])
                t = t + 0.05
                round(t, 2)
                time.sleep(0.05)
            self.position[2] = z
            print("op tijdstip: ", tijd2, " x: ", self.position[0], " y:", self.position[1], " z:",self.position[2])
            self.speed[2] = 0

    def vliegNaar(self, x, y, z):
        if z == -1:
            z = self.position[2]
        if not (x == self.position[0] and y == self.position[1] and z == self.position[2]):
            self.stijgOp()
            # als je op zelfde positie blijft doe je niets
            tijd = self.vliegHorizontaal(x, y)
            if z != self.position[2]:
                # dan moet je ook nog verticaal vliegen
                self.vliegVerticaal(z, tijd)

    def scan(self):
        print("item gescand met waarde 4000")
        return 4000


#drone = DroneTest()
#drone.set_xCoord(1000)
#drone.set_yCoord(2000)
#drone.set_zCoord(4000)
#drone.set_speedZ(1500)
#drone.set_speedY(1500)
#drone.set_speedX(1500)
#drone.vliegNaar(20,3000,2000)