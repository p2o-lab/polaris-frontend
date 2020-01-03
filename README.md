# polaris-frontend
Polaris is a Process Orchestration Layer application for controlling process equipment assemblies (PEA) in the context of modular production in process industries. Thus, it follows the VDI/VDE/NAMUR 2658 standards. *polaris-frontend* is a visualisation for Polaris recipe engine.

[![Build Status](https://cloud.drone.io/api/badges/p2o-lab/polaris-frontend/status.svg)](https://cloud.drone.io/p2o-lab/polaris-frontend) [![](https://images.microbadger.com/badges/version/p2olab/polaris-frontend.svg)](https://microbadger.com/images/p2olab/polaris-frontend) [![Greenkeeper badge](https://badges.greenkeeper.io/p2o-lab/polaris-frontend.svg)](https://greenkeeper.io/) [![CodeFactor](https://www.codefactor.io/repository/github/p2o-lab/polaris-frontend/badge)](https://www.codefactor.io/repository/github/p2o-lab/polaris-frontend) [![codecov](https://codecov.io/gh/p2o-lab/polaris-frontend/branch/develop/graph/badge.svg)](https://codecov.io/gh/p2o-lab/polaris-frontend)

## Features

polaris-frontend shows

## Installation and Deployment

### Dependencies
All dependencies are installed via NPM
```
npm install
```

### Starting the development server

Run `npm start` or `ng serve` for a development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


### Docker
```
docker run -d -p 8080:80 p2olab/polaris-frontend
```

### Build it and deploy it
```
ng build --prod
npm run deploy
```

## Usage

To work properly, *polaris-frontend* needs an backend, which is provided by [polaris-backend](https://github.com/p2o-lab/polaris-backend). Following is an exemplary development setup, which can be used to discover *polaris-frontend*.

### Run polaris-backend testserver
```
git clone https://github.com/p2o-lab/polaris-backend
cd ./polaris-backend
npm install
npm run-script testserver
```

### Run polaris-backend using docker image

```
docker pull p2olab/polaris-backend
docker run -d -p 3000:3000 p2olab/polaris-backend
```
### polaris-frontend setup

Clone project, install dependencies and start the development server. The module view show now show the test PEA.
