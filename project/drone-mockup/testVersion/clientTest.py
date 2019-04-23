import paho.mqtt.client as mqtt
import time
import json


class ClientTest:

    def __init__(self, d, queue):
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
                zCoord = d["z"]  # er zit nog geen z-coord in
                # self.drone.vliegNaar(xCoord, yCoord, zCoord)
                scan = d["scan"]
                scannen = True
                if scan != "False":
                    scannen = False
                array = [xCoord, yCoord, zCoord]
                queue.put(array)
                print("In de queue zit nu: ", str(array))
            if topic == "drone/stop" and m_decode == "stop":
                self.drone.stop()

        self.client = mqtt.Client("python1")
        self.broker = "localhost:1883"
        self.client.on_message = on_message

    def loopStart(self):
        self.client.loop_start()

    def loopStop(self):
        self.client.loop_stop()

    def ontvangStop(self):
        self.client.loop_start()
        self.client.subscribe("drone/stop")
        self.client.loop_stop()

    def stuurPosition(self):

        x = {
            "x": self.drone.get_xCoord(),
            "y": self.drone.get_yCoord(),
            "z": self.drone.get_zCoord()
        }
        y = json.dumps(x)
        self.client.publish("drone/position", y)


    def stuurScan(self):
        self.client.publish("drone/scan", self.drone.scan())

    def stuurBattery(self):
        self.client.loop_start()
        self.client.publish("drone/battery",self.drone.get_battery())  # eerste argument is het topic, 2de is de message
        self.client.loop_stop()

    def ontvangWaypoint(self):
        self.client.loop_start()
        self.client.subscribe("drone/moveto")
        self.client.loop_stop()

    def stuurMultiple(self):
        x = {
            "xCoord": self.drone.get_xCoord(),
            "yCoord": self.drone.get_yCoord(),
            "zCoord": self.drone.get_zCoord(),
            "xSpeed": self.drone.get_speedX(),
            "ySpeed": self.drone.get_speedY(),
            "zSpeed": self.drone.get_speedZ(),
            "xAccel": self.drone.get_accelX(),
            "yAccel": self.drone.get_accelY(),
            "zAccel": self.drone.get_accelZ(),
            "battery": self.drone.get_battery(),
            "jaw": self.drone.get_jaw(),
            "pitch": self.drone.get_pitch(),
            "roll": self.drone.get_roll(),
        }
        y = json.dumps(x)
        self.client.publish("drone/multiple", y)

    def connecteer(self):
        self.client.connect("localhost", 1883)

    def disconnecteer(self):
        self.client.disconnect()

