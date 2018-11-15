Recipe Execution Engine - Instruction Manual
============================================

The Recipe Execution Engine (REE) is a software tool for orchestrating process equipment assymblies (PEA)
in a process equipment frame (PEF). It provides mechanisms to observe and control services provided by PEAs and perform recipes defined in a JSON file on a PEF.

## Installation and Startup

The REE is deployed as a docker image. Thus, docker is required as only prerequisite

For running the REE use following command
```
docker run -d --name pfe-ree -p 3000:3000 registry.plt.et.tu-dresden.de/pfe-ree-node
```



## Usage

1. Open `http://localhost:3000` in a browser. The dashboard of the PFE is shown.
__add screenshot__

2. Load Modules into the REE. Use the prepared JSON file which has been generated from an MTP file
**add screenshot**

3. You see the the services of the module and their current state in 
**add screenshot**
 
4. Load recipe into REE. This is also served as JSON



## Data format specification
### Module JSON


### Recipe JSON


### Examples
