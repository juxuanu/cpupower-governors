# cpupower-governors
Enables the ability to swap between kernel governors for the CPU useful for laptops.
* OnDemand: Scales the frequency dynamically according to current load.
* Conservative: Like OnDemand but more gradually.
* Performance: Run the CPU at the maximum frequency.
* Powersave: Run the CPU at the minimum frequency.

## Requirements
* `cpupower`.
* `pkexec`, which is from `polkit`.

Tested on Gnome 3.38.1

## Persistance

If you would like to define a governor on boot, check `cpupower` manual. 
