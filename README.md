RaspiSoundPlayer
================

## create sdcard RASPBIAN

sudo dd bs=1m if=2014-01-07-wheezy-raspbian.img of=/dev/rdisk

sudo sync

diskutil eject /dev/disk

## raspi Sound player

based on http://www.imthi.com/blog/electronics/capacitive-touch-drumkit-with-raspberry-pi-using-mrp121.php and http://scott.j38.net/interactive/beetbox/

#autostart
sudo nano /etc/rc.local

# /distance
using arduino with sharp distance sensor to play sound

# /touch
using MPR121 (touch sensor) over I2C to play sounds


## raspi image conf

sudo raspi-config 
* expand
* activite i2c

sudo apt-get remove dphys-swapfile
* http://raspberrypi.stackexchange.com/questions/169/how-can-i-extend-the-life-of-my-sd-card
* put "sudo swapoff --all" in 
sudo nano /etc/fstab
tmpfs   /var/log    tmpfs    defaults,noatime,nosuid,mode=0755,size=100m    0 0

sudo apt-get purge --auto-remove 'libx11-.*'

sudo apt-get install python-pygame

sudo nano /etc/modules
sudo apt-get install i2c-tools

sudo apt-get update
sudo apt-get upgrade

