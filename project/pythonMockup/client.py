import paho.mqtt.client as mqtt
import time
from Drone import Drone
# je kan van hier uit ook subscriben op bepaalde topics
# connected was al oke

drone = Drone(1,5,6)# hier nog een betere manier voor zoeken

class Client:
    def __init__(self):
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
        self.client = mqtt.Client("python1")
        self.broker = "test.mosquitto.org"
        self.client.on_connect = on_connect
        self.client.on_disconnect = on_disconnect
        self.client.on_message = on_message



    #broker = "test.mosquitto.org"  # volgens mij zit hier nog een fout, waardoor al de rest faalt
    #client = mqtt.Client("python1")

    # client.on_log = on_log
    #client.on_connect = on_connect
    #client.on_disconnect = on_disconnect
    #client.on_message = on_message

    def stuurBattery(self):
        print("connecting to broker ", self.broker)

        self.client.connect(self.broker)
        self.client.loop_start()  # moet lopen om de callback functies te kunnen verbinden
        self.client.subscribe("drone/battery")
        self.client.publish("drone/battery", drone.get_battery())  # eerste argument is het topic, 2de is de message
        time.sleep(4)
        self.client.loop_stop()
        self.client.disconnect()



client = Client()
client.stuurBattery()
