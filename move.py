#!/usr/bin/env python

"""move.py: dynamic Soundplayer Sharp Distance sensor"""

__author__ = "Christopher Pietsch"
__email__ = "cpietsch@gmail.com"


import pygame
import os


import serial


# User pygame for sounds
SONG_END = pygame.USEREVENT + 1

pygame.mixer.pre_init(44100, -16, 12, 512)
pygame.init()

sounds = {}
playing = 0

ser = serial.Serial('/dev/serial/by-id/usb-Arduino_LLC_Arduino_Leonardo-if00', 9600)

for file in os.listdir("/home/pi/sound/wav"):
	if file.endswith(".wav"):
		index = int(file.split('.')[0])
		Sound = pygame.mixer.Sound("/home/pi/sound/wav/" + file)
		Sound.set_volume(.85);
		sounds[index] = Sound
		print( 'loaded ' + file + " : " + str(index))


while True:

	sensor = ser.readline().strip()
	
	if sensor == "play":
		print "trigger!"
		if playing == 0:
			sounds[0].play().set_endevent(SONG_END)
			playing = 1
	

	for event in pygame.event.get():
		if event.type == SONG_END:
			print "sound end"
			playing = 0


        

