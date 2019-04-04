import paho.mqtt.client as mqtt
#from Drone import Drone
import json

class Client2:
    def __init__(self):
        self.client = mqtt.Client("python1")
        self.broker = "localhost:1883"

    def stuurPosition(self,drone):
        self.client.loop_start()
        string = ""+str(drone.get_xCoord())+";"+str(drone.get_yCoord())+";"+str(drone.get_zCoord())
        array = [drone.get_xCoord(),drone.get_yCoord(),drone.get_zCoord()]
        y = json.dumps(array)
        self.client.publish("drone/position", str(y))
        self.client.loop_stop()
