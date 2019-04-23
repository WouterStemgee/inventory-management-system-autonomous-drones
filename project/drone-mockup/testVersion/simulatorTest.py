from droneTest import DroneTest
from clientTest import ClientTest
from myThreadTest import myThreadTest
import threading
import time
import queue


class Simulator:
    def __init__(self, d):
        self.drone = d
        self.queue = queue.Queue(maxsize=100)
        self.clientTest = ClientTest(self.drone, self.queue)

    def get_queue(self):
        return self.queue

    def simuleer(self):
        self.clientTest.connecteer()
        self.clientTest.ontvangWaypoint()  # hier wordt gewoon gesubscribed op iets dat waypoints door te sturen
        while True:

            if self.queue.qsize() > 0 and threading.activeCount() == 1:  # hier moet volgens mij een fout zitten
                array = self.queue.get()
                print("in simulator test zit nu in de array ", str(array))
                thread = myThreadTest(self.drone, array)
                thread.start()
            self.drone.set_battery(self.drone.get_battery() - 1)
            self.clientTest.stuurBattery()
            self.clientTest.stuurPosition()
            time.sleep(0.05)

        self.clientTest.disconnecteer()  # hier ga je nooit geraken, het programma moet in een oneindige loop lopen


drone = DroneTest()
drone.set_battery(100)
#drone.set_xCoord(2)
#drone.set_yCoord(22)
#drone.set_zCoord(0)
drone.set_speedX(0)
drone.set_speedY(0)
drone.set_speedZ(0)
simulator = Simulator(drone)
simulator.simuleer()
