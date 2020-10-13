# cpupower-governors
Enables the ability to swap between kernel governors for the CPU useful for laptops.

## Requirements
* `cpupower`.
* `pkexec`, which is from `polkit`.

Tested on Gnome 3.38.1

## Persistance

If you'd like to make the governor of your choice persistant across reboots, `systemctl enable cpupower.service`.
