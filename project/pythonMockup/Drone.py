import json
import xml.etree.ElementTree as et
import paho.mqtt.client as mqtt
import time

#broker="test.mosquitto.org"

class Drone:
    # via mqtt vanuit python connecten naar broker (mosquitto)
    def __init__(self,id, length,width=0):
        self.length = length
        if(width==0):
            self.width = length
        self.battery = 100
        self.drone_id = id
        # positie array
        self.xCoord = None
        self.yCoord = None
        self.hoogte = None
        self.accel = None
        self.speed = None
        # jaw pich roll
        self.blijfSturen = True # dit staat waarschijnlijk nog niet op de juiste plaats
        # er moet nog een hoop data toegevoegd worden

    def simuleer_vliegen(self):
        self.set_hoogte(0)
        # veronderstel dat je vertrekt vanuit (0,0)
        self.set_xCoord(0)
        self.set_yCoord(0)
        # tijdsdilataties toevoegen
        self.set_hoogte(1.5) # kan niet in 1 keer op 1,5 m staan moet geleidelijk opbouwen

        self.set_yCoord(1)

        self.set_yCoord(2)

        self.set_xCoord(1)

        self.set_yCoord(3)

        self.set_xCoord(2)

        self.set_yCoord(2)

        self.set_yCoord(1)

        self.set_yCoord(0)

        self.set_xCoord(1)

        self.set_xCoord(0) #terug bij het begin punt


    def giveInfo(self):
        # info verzenden om de 50 ms
        starttime = time.time()
        while self.blijfSturen:
            payload = {
                'id': self.drone_id,
                'length': self.length,
                'width': self.width,
                'battery': self.battery
            }
            return json.dumps(payload)
            time.sleep(0.05 - ((time.time() - starttime) % 0.05))


    def giveInfoTest(self):
        payload = {
            'id': self.drone_id,
            'length': self.length,
            'width': self.width,
            'battery': self.battery
        }
        return json.dumps(payload)

    def set_speed(self,s):
        self.speed = s

    def get_speed(self):
        return self.speed

    def get_accel(self):
        return self.get_accel()

    def set_accel(self,a):
        self.accel = a

    # getters en setters voor de variabelen van de drone
    def get_hoogte(self):
        return self.hoogte

    def set_hoogte(self,h):
        self.hoogte = h

    def get_xCoord(self):
        return self.xCoord

    def set_xCoord(self,x):
        self.xCoord = x

    def get_yCoord(self):
        return self.yCoord

    def set_yCoord(self,y):
        self.yCoord = y

    def get_id(self):
        return self.drone_id

    # geen setter voor drone_id

    def get_length(self):
        return self.length

    def set_length(self,lengte):
        self.length = lengte

    def set_width(self):
        return self.width

    def set_width(self,width):
        self.width = width

    def get_battery(self):
        return self.battery

    def set_battery(self,battrij):
        self.battery = battrij

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
                print(drone1.giveInfoTest())
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
                    drone1.set_length(waarde)
                elif (letter == "W"):
                    drone1.set_width(waarde)
                elif (letter == "B"):
                    drone1.set_battery(waarde)
                elif (letter == "X"):
                    drone1.set_xCoord(waarde)
                elif (letter == "Y"):
                    drone1.set_yCoord(waarde)
                elif (letter == "H"):
                    drone1.set_hoogte(waarde)
                elif (letter == "A"):
                    drone1.set_accel(waarde)
                elif (letter == "S"):
                    drone1.set_speed(waarde)
                else:
                    print("geen juiste parameters")

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



