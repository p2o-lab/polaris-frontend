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


## Settings

The settings view allows you to adapt settings of the PFE. The settings are persisted in the browser.

As first option, you can change the URI of the PFE backend (if you want to host the frontend somewhere else than the backend). The default value of the *URI* refers to the same server as the frontend.

Furthermore, you can enable *AutoReset*. If this feature is enabled, the PFE will automatically reset a service (thus, bring it to IDLE) if the service has COMPLETED. This reduces additional service calls from the user or the recipe engine. The default option of *AutoReset* is on.    

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

string
### Examples
