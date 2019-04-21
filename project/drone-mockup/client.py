import paho.mqtt.client as mqtt
import time
import json


class Client:

    def __init__(self, d, queue):
        self.drone = d
        self.queue = queue

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
            if topic == "drone/moveto":
                # json {x:...,y...}
                d = json.loads(m_decode)
                print(d)
                xCoord = d["x"]
                yCoord = d["y"]
                zCoord = d["z"]  # er zit nog geen z-coord in
                # self.drone.vliegNaar(xCoord, yCoord, zCoord)
                scan = d["scan"]
                scannen = True
                if scan != "False":
                    scannen = False
                array = [xCoord, yCoord, zCoord]
                queue.put(array)
                print("In de queue zit nu: ", str(array))

        self.client = mqtt.Client("python1")
        self.broker = "localhost:1883"
        self.client.on_message = on_message
        self.client.on_connect = on_connect
        self.client.on_disconnect = on_disconnect

    def stuurPosition(self):
        self.client.loop_start()
        x = {
            "x": self.drone.get_xCoord(),
            "y": self.drone.get_yCoord(),
            "z": self.drone.get_zCoord()
        }
        y = json.dumps(x)
        self.client.publish("drone/position", y)
        self.client.loop_stop()

    def stuurScan(self):
        self.client.loop_start()
        self.client.publish("drone/scan", self.drone.scan())
        self.client.loop_stop()

    def stuurBattery(self):
        self.client.loop_start()  # moet lopen om de callback functies te kunnen verbinden
        self.client.publish("drone/battery",self.drone.get_battery())  # eerste argument is het topic, 2de is de message
        self.client.loop_stop()

    def ontvangWaypoint(self):
        self.client.loop_start()
        self.client.subscribe("drone/moveto")
        self.client.loop_stop()

    def stuurAcceleration(self):
        self.client.loop_start()
        x = {
            "x": self.drone.get_xCoord(),
            "y": self.drone.get_yCoord(),
            "z:": self.drone.get_zCoord()
        }
        string = json.dumps(x)
        self.client.publish("drone/acceleration", string)
        self.client.loop_stop()

    def stuurSpeed(self):
        self.client.loop_start()
        string = "{x:" + str(self.drone.get_xCoord()) + ",y:" + str(self.drone.get_yCoord()) + ",z:" + str(
            self.drone.get_zCoord()) + "}"
        self.client.publish("drone/speed", string)

    def stuurJaw(self):
        self.client.loop_start()
        self.client.publish("drone/jaw", self.drone.get_jaw())
        self.client.loop_stop()

    def stuurRoll(self):
        self.client.loop_start()
        self.client.publish("drone/roll", self.drone.get_roll())
        self.client.loop_stop()

    def stuurPitch(self):
        self.client.loop_start()
        self.client.publish("drone/pitch", self.drone.get_pitch())
        self.client.loop_stop()

    def ontvangSnelheid(self):
        self.client.loop_start()
        self.client.subscribe("drone/snelheid")
        self.client.loop_stop()

    def ontvangVersnelling(self):
        self.client.loop_start()
        self.client.subscribe("drone/versnelling")
        self.client.loop_stop()

    def connecteer(self):
        self.client.connect("localhost", 1883)

    def disconnecteer(self):
        self.client.disconnect()
