RaspiSoundPlayer
================

## create sdcard RASPBIAN

sudo dd bs=1m if=2014-01-07-wheezy-raspbian.img of=/dev/rdisk

diskutil eject /dev/disk2

## install node

wget http://node-arm.herokuapp.com/node_latest_armhf.deb

sudo dpkg -i node_latest_armhf.deb

sudo npm install -g node-gyp

## packages

npm install walk node-mpg123 serialport
