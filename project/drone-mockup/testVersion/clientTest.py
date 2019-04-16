import paho.mqtt.client as mqtt
import time
import json


class ClientTest:

    def __init__(self, d,queue):
        self.drone = d
        self.queue = queue

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
                zCoord = d["z"] # er zit nog geen z-coord in
                #self.drone.vliegNaar(xCoord, yCoord, zCoord)
                array = [xCoord,yCoord,zCoord]
                queue.put(array)
                print("In de queue zit nu: ",str(array))

        self.client = mqtt.Client("python1")
        self.broker = "localhost:1883"
        self.client.on_message = on_message

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

    def connecteer(self):
        self.client.connect("localhost", 1883)

    def disconnecteer(self):
        self.client.disconnect()

