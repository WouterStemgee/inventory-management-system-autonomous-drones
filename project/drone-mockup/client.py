import paho.mqtt.client as mqtt
import time
from Drone import Drone

class Client:
    def __init__(self,d):

        #self.drone = Drone(5,6)
        #self.drone.set_speedH(22)
        #self.drone.set_accelV(2)
        #self.drone.set_accelH(3)
        #self.drone.set_speedH(33)
        #self.drone.set_speedV(22)
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
                # x;y
                coordinaten = m_decode.split(';')
                xCoord = coordinaten[0]
                yCoord = coordinaten[1]
                self.drone.beweegNaarCoordinaat(xCoord,yCoord)
        self.client = mqtt.Client("python1")
        #self.broker = "test.mosquitto.org"
        self.broker = "localhost:1883"
        self.client.on_connect = on_connect
        #self.client.on_disconnect = on_disconnect
        self.client.on_message = on_message

    def stuurBattery(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost", 1883)
        self.client.loop_start()  # moet lopen om de callback functies te kunnen verbinden
        #self.client.subscribe("Battery")
        self.client.publish("Battery", self.drone.get_battery())  # eerste argument is het topic, 2de is de message
        #time.sleep(4) # even wachten zodat je het result van het subscriben kan zien, mag als alles werkt verwijder worden
        self.client.loop_stop()
        self.client.disconnect()

    def stuurPosition(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost",1883)
        self.client.loop_start()
        #self.client.subscribe("Position")
        # positie opvragen en in string omzetten om door te sturen
        string = ""+str(self.drone.get_xCoord())+";"+str(self.drone.get_yCoord())+";"+str(self.drone.get_zCoord())
        self.client.publish("Position", string)
        #time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()

# als de waarde nog None wordt ze gewoon niet mee gegeven

    def stuurAccelerationHorizontal(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost", 1883)
        self.client.loop_start()
        #self.client.subscribe("AccelerationH")
        self.client.publish("AccelerationH", self.drone.get_accelH())
        #time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()

    def stuurAccelerationVertical(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost", 1883)
        self.client.loop_start()
        #self.client.subscribe("AccelerationV")
        self.client.publish("AccelerationV", self.drone.get_accelV())
        #time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()

    def stuurSpeedHorizontal(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost", 1883)
        self.client.loop_start()
        #self.client.subscribe("SpeedH")
        self.client.publish("SpeedH", self.drone.get_speedH())
        #time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()

    def stuurSpeedVertical(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost", 1883)
        self.client.loop_start()
        #self.client.subscribe("SpeedV")
        self.client.publish("SpeedV", self.drone.get_speedV())
        #time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()

    def stuurJaw(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost", 1883)
        self.client.loop_start()
        #self.client.subscribe("Jaw")
        self.client.publish("Jaw", self.drone.get_jaw())
        #time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()

    def stuurRoll(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost", 1883)
        self.client.loop_start()
        #self.client.subscribe("Roll")
        self.client.publish("Roll", self.drone.get_roll())
        #time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()

    def stuurPitch(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost", 1883)
        self.client.loop_start()
        #self.client.subscribe("Pitch")
        self.client.publish("Pitch", self.drone.get_pitch())
        #time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()

    def stuurVersnellingsVector(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost", 1883)
        self.client.loop_start()
        #self.client.subscribe("versnelling")
        vector = [self.drone.get_accelH(),self.drone.get_accelV()]
        self.client.publish("versnelling", str(vector))
        #time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()

    def stuurSpeedVector(self):
        #print("connecting to broker ", self.broker)
        self.client.connect("localhost", 1883)
        self.client.loop_start()
        #self.client.subscribe("speed")
        vector = [self.drone.get_speedH(),self.drone.get_speedV()]
        self.client.publish("speed", str(vector))
        #time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()

    def ontvangWaypoint(self):
        self.client.connect("localhost",1883)
        self.client.loop_start()
        self.client.subscribe("waypoint")
        self.client.loop_stop()
        self.client.disconnect()

#client = Client()
#client.stuurSpeedVector()

