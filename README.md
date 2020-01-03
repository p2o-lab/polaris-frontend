# polaris-frontend
Visualisation for Polaris recipe engine [polaris-backend](https://github.com/p2o-lab/polaris-backend)

[![Build Status](https://cloud.drone.io/api/badges/p2o-lab/polaris-frontend/status.svg)](https://cloud.drone.io/p2o-lab/polaris-frontend) [![](https://images.microbadger.com/badges/version/p2olab/polaris-frontend.svg)](https://microbadger.com/images/p2olab/polaris-frontend) [![Greenkeeper badge](https://badges.greenkeeper.io/p2o-lab/polaris-frontend.svg)](https://greenkeeper.io/) [![CodeFactor](https://www.codefactor.io/repository/github/p2o-lab/polaris-frontend/badge)](https://www.codefactor.io/repository/github/p2o-lab/polaris-frontend) [![codecov](https://codecov.io/gh/p2o-lab/polaris-frontend/branch/develop/graph/badge.svg)](https://codecov.io/gh/p2o-lab/polaris-frontend)

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
