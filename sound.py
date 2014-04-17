#!/usr/bin/env python

"""sound.py: dynamic Soundplayer for mpr121 based on BeetBox"""

__author__ = "Christopher Pietsch"
__email__ = "cpietsch@gmail.com"


import pygame
import os

import RPi.GPIO as GPIO
import mpr121

# Use GPIO Interrupt Pin

GPIO.setmode(GPIO.BOARD)
GPIO.setup(7, GPIO.IN)

# Use mpr121 class for everything else

mpr121.TOU_THRESH = 0x0F
mpr121.REL_THRESH = 0x0A
mpr121.setup(0x5a)

# User pygame for sounds

pygame.mixer.pre_init(44100, -16, 12, 512)
pygame.init()

sounds = []
lastTouch = 0

for file in os.listdir("./wav"):
	if file.endswith(".wav"):
		Sound = pygame.mixer.Sound("wav/" + file)
		Sound.set_volume(.85);
		sounds.append(Sound)
		print( 'loaded ' + file)


touches = [0] * len(sounds);

while True:

	if (GPIO.input(7)): # Interupt pin is high
		pass
	else: # Interupt pin is low
        
		touchData = mpr121.readData(0x5a)

		for i in range(len(sounds)):

			if (touchData & (1<<i)):

				if (touches[i] == 0):

					print( 'Pin ' + str(i) + ' was just touched')

					sounds[lastTouch].stop();
					sounds[i].play();
					lastTouch = i;

				touches[i] = 1;
			else:
				if (touches[i] == 1):
					print( 'Pin ' + str(i) + ' was just released')
				touches[i] = 0;
