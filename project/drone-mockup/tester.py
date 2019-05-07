import paho.mqtt.client as mqtt
from drone import  Drone
import json
class Tester:
    def __init__(self):
        def on_message(client, userdata, msg):
            topic = msg.topic
            m_decode = str(msg.payload.decode("utf-8", "ignore"))
            print("message received", m_decode)
            if topic == "drone/multiple":
                print(m_decode)
        self.client = mqtt.Client("python1")
        self.broker = "localhost:1883"
        self.client.on_message = on_message
    def stuurWaypoint(self,x,y,z):
        self.client.loop_start()
        a = {
            "x": x,
            "y" : y,
            "z" : z
        }
        b = json.dumps(a)
        self.client.publish("drone/moveto",b)  # eerste argument is het topic, 2de is de message
        self.client.loop_stop()

    def ontvangMultiple(self):
        self.client


drone = Drone()
tester = Tester()
drone.set_speedX(100)
drone.set_speedY(100)
drone.set_speedZ(100)
drone.set_accelX(30)
drone.set_speedY(50)
drone.set_speedZ(40)
drone.simuleer()
tester.stuurWaypoint(1000,6000,5000)
