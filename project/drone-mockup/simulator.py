from drone import Drone
from client import Client
from myThread import myThread
import threading
import time
import queue


class Simulator:
    def __init__(self, d):
        self.drone = d
        self.queue = queue.Queue(maxsize=100)
        self.client = Client(self.drone, self.queue)

    def get_queue(self):
        return self.queue

    def simuleer(self):
        self.client.connecteer()
        self.client.ontvangWaypoint()  # hier wordt gewoon gesubscribed op iets dat waypoints door te sturen
        self.client.ontvangJaw()
        self.client.ontvangPitch()
        self.client.ontvangRoll()
        #self.client.ontvangSnelheid()
        #self.client.ontvangVersnelling()
        # hier schrijf je alles waarop je je wilt subscriben
        while True:
            if self.queue.qsize() > 0 and threading.activeCount() == 1:  # hier moet volgens mij een fout zitten
                array = self.queue.get()
                print("in simulator test zit nu in de array ", str(array))
                thread = myThread(self.drone, array)
                thread.start()
                if array[3]:
                    self.client.stuurScan()
            self.drone.set_battery(self.drone.get_battery() - 1)
            self.client.stuurBattery()
            self.client.stuurPosition()
            self.client.stuurJaw()
            self.client.stuurPitch()
            self.client.stuurRoll()
            #self.client.stuurVersnellingsVector()
            #self.client.stuurSpeedVector()
            # hier schrijf je alles wat je wilt doorsturen
            time.sleep(0.05)

        self.client.disconnecteer()  # hier ga je nooit geraken, het programma moet in een oneindige loop lopen


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
simulator = Simulator(drone)
simulator.simuleer()
