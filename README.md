# polaris-frontend
Visualisation for POL recipe engine *polaris-backend*

[![Build status](http://cif.plt.et.tu-dresden.de/api/badges/modulare-automation/pfe-ree-viz/status.svg)](http://cif.plt.et.tu-dresden.de/modulare-automation/pfe-ree-viz)
[![Docker image](https://img.shields.io/badge/docker%20image-available-brightgreen.svg)](http://registry.plt.et.tu-dresden.de/#!taglist/pfe-ree-viz)
[![NPM package](https://img.shields.io/badge/npm%20package-available-brightgreen.svg)](https://registry.plt.et.tu-dresden.de:4873/#/detail/@plt/pfe-ree-viz)

## Dependencies
All dependencies are installed via NPM
```
npm install
```

## Development server

Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Docker
```
docker run --name registry.plt.et.tu-dresden.de/pfe-ree-viz -d -p 8080:80 pfe-ree-viz
```

Build it and deploy it
```
ng build --prod
npm run deploy
```
