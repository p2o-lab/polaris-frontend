# polaris-frontend
Visualisation for Polaris recipe engine [polaris-backend](https://github.com/p2o-lab/polaris-backend)

Master: [![Build Status](https://cloud.drone.io/api/badges/p2o-lab/polaris-frontend/status.svg)](https://cloud.drone.io/p2o-lab/polaris-frontend)
Develop: [![Build Status](https://cloud.drone.io/api/badges/p2o-lab/polaris-frontend/status.svg?ref=/refs/heads/develop)](https://cloud.drone.io/p2o-lab/polaris-frontend)
Docker: [![](https://images.microbadger.com/badges/version/p2olab/polaris-frontend.svg)](https://microbadger.com/images/p2olab/polaris-frontend) [![Greenkeeper badge](https://badges.greenkeeper.io/p2o-lab/polaris-frontend.svg)](https://greenkeeper.io/)

## Dependencies
All dependencies are installed via NPM
```
npm install
```

## Development server

Run `npm start` or `ng serve` for a development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Docker
```
docker run -d -p 8080:80 p2olab/polaris-frontend
```

Build it and deploy it
```
ng build --prod
npm run deploy
```
