# polaris-frontend
Polaris is a Process Orchestration Layer application for controlling process equipment assemblies (PEA) in the context of modular production in process industries. Thus, it follows the VDI/VDE/NAMUR 2658 standards. *polaris-frontend* is a visualisation for Polaris recipe engine.

## Features

polaris-frontend is able to provide several visualisations for orchestrating multiple PEAs:

- Playlist for Recipes
- Recipe View & Control
- Module View & Control
- Service Launcher
- Trend View

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
git clone https://dev.plt.et.tu-dresden.de/modulare-automation/polaris-backend.git
cd ./polaris-backend
npm install
npm run-script testserver
```


### Run polaris-frontend

Clone project, follow the above instructions to install dependencies and start the development server. The test PEA can now added in the module view.
