import threading
import time

class myThreadTest(threading.Thread):

    def __init__(self,drone,array):
        threading.Thread.__init__(self)
        self.drone = drone
        self.coordinaten = array

    def run(self):
        # hier bepaal je wat de thread gaat moeten doen
        self.drone.vliegNaar(self.coordinaten[0],self.coordinaten[1],self.coordinaten[2])
