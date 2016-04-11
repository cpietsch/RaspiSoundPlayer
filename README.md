RaspiSoundPlayer
================

## create sdcard RASPBIAN

```
sudo dd bs=1m if=2014-01-07-wheezy-raspbian.img of=/dev/rdisk
sudo sync
diskutil eject /dev/disk
```

# find raspis on network

```nmap -sP 192.168.10.1/24```

## raspi Sound player

based on http://www.imthi.com/blog/electronics/capacitive-touch-drumkit-with-raspberry-pi-using-mrp121.php and http://scott.j38.net/interactive/beetbox/

#autostart
```sudo nano /etc/rc.local```

# /distance
using arduino with sharp distance sensor to play sound

# /touch
using MPR121 (touch sensor) over I2C to play sounds


## raspi image conf

```sudo raspi-config```
* expand
* activate i2c / ssh

```sudo apt-get remove dphys-swapfile```
* http://raspberrypi.stackexchange.com/questions/169/how-can-i-extend-the-life-of-my-sd-card
* put ```sudo swapoff --all``` 
* in ```sudo nano /etc/fstab``` : ```tmpfs   /var/log    tmpfs    defaults,noatime,nosuid,mode=0755,size=100m    0 0```

* ```sudo apt-get purge --auto-remove 'libx11-.*'```

* ```sudo apt-get install python-pygame```

* ```sudo apt-get install python-smbus```

## raspi config ```sudo nano /boot/config.txt```
```
dtparam=audio=on
gpu_mem=256
dtparam=i2c_arm=on
```
