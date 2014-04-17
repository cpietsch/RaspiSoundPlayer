RaspiSoundPlayer
================

## create sdcard RASPBIAN

sudo dd bs=1m if=2014-01-07-wheezy-raspbian.img of=/dev/rdisk

sudo sync

diskutil eject /dev/disk

## raspi Sound player

based on http://www.imthi.com/blog/electronics/capacitive-touch-drumkit-with-raspberry-pi-using-mrp121.php and http://scott.j38.net/interactive/beetbox/

autostart
sudo nano /etc/rc.local
