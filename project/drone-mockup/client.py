import paho.mqtt.client as mqtt
import time
from Drone import Drone
import json

class Client:
    def __init__(self,d):
        self.drone = d

        def on_log(client, userdata, level, buf):
            print("log: " + buf)

        def on_connect(client, userdata, flags, rc):
            if rc == 0:
                print("connected oke")
            else:
                print("Bad connection, returned code=", rc)

        def on_disconnect(client, userdata, flags, rc=0):
            print("Disconnected result code " + str(rc))

        def on_message(client, userdata, msg):
            topic = msg.topic
            m_decode = str(msg.payload.decode("utf-8", "ignore"))
            print("message received", m_decode)
            if topic == "waypoint":
                # json {x:...,y...}
                d = json.loads(m_decode)
                #coordinaten = m_decode.split(';')
                #xCoord = coordinaten[0]
                #yCoord = coordinaten[1]
                #zCoord = coordinaten[2]
                xCoord = d["x"]
                yCoord = d["y"]
                zCoord = self.drone.get_zCoord()
                self.drone.vliegNaar(xCoord,yCoord,zCoord)
            elif topic == "snelheid":
                # Vx;Vy;Vz
                vector = m_decode.split(';')
                Vx = vector[0]
                Vy = vector[1]
                Vz = vector[2]
                self.drone.set_speedX(Vx)
                self.drone.set_speedY(Vy)
                self.drone.set_speedZ(Vz)
            elif topic == "versnelling":
                # Ax;Ay;Az
                vector = m_decode.split(';')
                Ax = vector[0]
                Ay = vector[1]
                Az = vector[2]
                self.drone.set_accelX(Ax)
                self.drone.set_accelY(Ay)
                self.drone.set_accelZ(Az)
            elif topic == "ScanCommando":
                self.drone.scan()

        self.client = mqtt.Client("python1")
        #self.broker = "test.mosquitto.org"
        self.broker = "localhost:1883"
        self.client.on_connect = on_connect
        #self.client.on_disconnect = on_disconnect
        self.client.on_message = on_message

    def stuurScan(self):
        self.client.loop_start()
        self.client.publish("Scan",self.drone.scan())
        self.client.loop_stop()

    def ontvangScanCommando(self):
        self.client.loop_start()
        self.client.subscribe("ScanCommando")
        self.client.loop_stop()

    def stuurBattery(self):
        #print("connecting to broker ", self.broker)
        #self.client.connect("localhost", 1883)
        self.client.loop_start()  # moet lopen om de callback functies te kunnen verbinden
        #self.client.subscribe("Battery")
        self.client.publish("Battery", self.drone.get_battery())  # eerste argument is het topic, 2de is de message
        #time.sleep(4) # even wachten zodat je het result van het subscriben kan zien, mag als alles werkt verwijder worden
        self.client.loop_stop()
        #self.client.disconnect()

    def stuurPosition(self):
        self.client.loop_start()
        string = ""+str(self.drone.get_xCoord())+";"+str(self.drone.get_yCoord())+";"+str(self.drone.get_zCoord())
        array = [self.drone.get_xCoord(),self.drone.get_yCoord(),self.drone.get_zCoord()]
        self.client.publish("Position", array)
        self.client.loop_stop()

    def stuurAcceleration(self):
        self.client.loop_start()
        string = ""+str(self.drone.get_accelX())+";"+str(self.drone.get_accelY())+";"+str(self.drone.get_accelZ())
        self.client.publish("Acceleration",string)
        self.client.loop_stop()

    def stuurSpeed(self):
        self.client.loop_start()
        string = ""+str(self.drone.get_speedX())+";"+str(self.drone.get_speedY())+";"+str(self.drone.get_speedZ())
        self.client.publish("Speed",string)

    def stuurJaw(self):
        self.client.loop_start()
        self.client.publish("Jaw", self.drone.get_jaw())
        self.client.loop_stop()

    def stuurRoll(self):
        self.client.loop_start()
        self.client.publish("Roll", self.drone.get_roll())
        self.client.loop_stop()

    def stuurPitch(self):
        self.client.loop_start()
        self.client.publish("Pitch", self.drone.get_pitch())
        self.client.loop_stop()

    def ontvangWaypoint(self):
        self.client.loop_start()
        self.client.subscribe("waypoint")
        self.client.loop_stop()

    def ontvangSnelheid(self):
        self.client.loop_start()
        self.client.subscribe("snelheid")
        self.client.loop_stop()

    def ontvangVersnelling(self):
        self.client.loop_start()
        self.client.subscribe("versnelling")
        self.client.loop_stop()

    def connecteer(self):
        self.client.connect("localhost", 1883)

    def disconnecteer(self):
        self.client.disconnect()

#client = Client()
#client.stuurSpeedVector()

