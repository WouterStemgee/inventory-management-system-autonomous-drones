import threading
import time

class myThread(threading.Thread):

    def __init__(self,drone,client):
        threading.Thread.__init__(self)
        self.client

    def run(self):
        # hier bepaal je wat de thread gaat moeten doen
