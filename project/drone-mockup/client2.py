import paho.mqtt.client as mqtt
#from Drone import Drone
import json

class Client2:
    def __init__(self):
        self.client = mqtt.Client("python1")
        self.broker = "localhost:1883"

    def stuurPosition(self,drone):
        self.client.loop_start()
        x = {
            "x":self.drone.get_xCoord(),
            "y": self.drone.get_yCoord(),
            "z":self.drone.get_zCoord()
        }
        y = json.dumps(x)
        self.client.publish("drone/position", y)
        self.client.loop_stop()
