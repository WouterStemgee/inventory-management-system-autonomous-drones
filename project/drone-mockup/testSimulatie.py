from simulator import Simulator
from Drone import Drone
from client import Client

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