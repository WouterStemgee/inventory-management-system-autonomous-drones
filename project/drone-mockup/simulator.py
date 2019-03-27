from Drone import Drone
from client import Client

class Simulator:
    def __init__(self,d):
        self.drone = d
        self.client = Client(self.drone)

    def simuleer(self):
        while True:
            self.drone.set_battery(self.drone.get_battery()-1)
            self.client.stuurBattery()
            self.client.stuurPosition()
            self.client.stuurAccelerationHorizontal()
            self.client.stuurAccelerationVertical()
            self.client.stuurSpeedHorizontal()
            self.client.stuurSpeedVertical()
            self.client.stuurJaw()
            self.client.stuurPitch()
            self.client.stuurRoll()
            self.client.stuurVersnellingsVector()
            self.client.stuurSpeedVector()
            self.client.ontvangWaypoint()

drone = Drone(5,6)
drone.set_battery(100)
drone.set_xCoord(2)
drone.set_yCoord(22)
drone.set_zCoord(8)
drone.set_accelH(3)
drone.set_accelV(77)
drone.set_speedH(55)
drone.set_speedV(99)
drone.set_jaw(1)
drone.set_pitch(222)
drone.set_roll(666)
simulator = Simulator(drone)
simulator.simuleer()