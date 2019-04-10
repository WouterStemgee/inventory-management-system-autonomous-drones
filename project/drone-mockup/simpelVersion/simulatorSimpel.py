from DroneSimpel import DroneSimpel
from clientSimpel import ClientSimpel
import time

class Simulator:
    def __init__(self,d):
        self.drone = d
        self.client = ClientSimpel(self.drone)
        self.drone.set_client(self.client)

    def simuleer(self):
        self.client.connecteer()
        self.client.ontvangWaypoint()  # hier wordt gewoon gesubscribed op iets dat waypoints door te sturen, hoe wordt dit doorgestuurd?
        while True:
            self.drone.set_battery(self.drone.get_battery()-1)
            self.client.stuurBattery()
            self.client.stuurPosition()
            time.sleep(0.05)

        self.client.disconnecteer() # hier ga je nooit geraken, het programma moet in een oneindige loop lopen

drone = DroneSimpel()
drone.set_battery(100)
drone.set_xCoord(2)
drone.set_yCoord(22)
drone.set_zCoord(8)
drone.set_speedX(0)
drone.set_speedY(0)
drone.set_speedZ(0)
simulator = Simulator(drone)
simulator.simuleer()