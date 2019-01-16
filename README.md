# pfe-ree-viz
Visualisation for PFE recipe engine *pfe-ree-node*

## Dependencies
All dependencies are installed via NPM
```
npm install
```

## Development server

Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Publish
*pfe-ree-viz* is provided via our private NPM registry (https://registry.plt.et.tu-dresden.de:4873)
```
npm publish
``` 

## Docker
```
docker run --name registry.plt.et.tu-dresden.de/pfe-ree-viz -d -p 8080:80 pfe-ree-viz
```

Build it and deploy it
```
ng build --prod
npm run deploy
```