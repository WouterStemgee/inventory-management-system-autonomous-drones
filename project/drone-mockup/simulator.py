from Drone import Drone
from client import Client
import time

class Simulator:
    def __init__(self,d):
        self.drone = d
        self.client = Client(self.drone)
        self.drone.set_client(self.client)

    def simuleer(self):
        self.client.connecteer()
        self.client.ontvangWaypoint()  # hier wordt gewoon gesubscribed op iets dat waypoints door te sturen, hoe wordt dit doorgestuurd?
        #self.client.ontvangSnelheid()
        #self.client.ontvangVersnelling()
        #self.client.ontvangScanCommando()
        # de drone geraakt hier niet, hij voert eerst het vliegen uit
        while True:
            self.drone.set_battery(self.drone.get_battery()-1)
            self.client.stuurBattery()
            self.client.stuurPosition()
            #self.client.stuurAccelerationHorizontal()
            #self.client.stuurAccelerationVertical()
            #self.client.stuurSpeedHorizontal()
            #self.client.stuurSpeedVertical()
            #self.client.stuurJaw()
            #self.client.stuurPitch()
            #self.client.stuurRoll()
            #self.client.stuurVersnellingsVector()
            #self.client.stuurSpeedVector()
            # welke commando's moet ik nog ellemaal binnen kunnen krijgen
            time.sleep(0.05)

        self.client.disconnecteer() # hier ga je nooit geraken, het programma moet in een oneindige loop lopen

drone = Drone()
drone.set_battery(100)
drone.set_xCoord(500)
drone.set_yCoord(500)
drone.set_zCoord(8)
drone.set_accelX(0)
drone.set_accelY(0)
drone.set_accelZ(0)
drone.set_speedX(0)
drone.set_speedY(0)
drone.set_speedZ(0)
drone.set_jaw(1)
drone.set_pitch(0)
drone.set_roll(0)
simulator = Simulator(drone)
simulator.simuleer()