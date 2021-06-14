import scapy.layers.l2
import time
import sys  # nest.js로부터 매개변수를 받기 위함

def getNetwork(ipRange):
    # net = '192.168.0.1/24'
    net = ipRange

    while True:
        ans, noans = scapy.layers.l2.arping(net, timeout=1, verbose=False)

        for sent, received in ans.res:
            ip = received.psrc
            mac = received.hwsrc

            print('%s\t%s' % (ip, mac))
