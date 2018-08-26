# pfe-ree-viz

## Dependencies
All dependencies are installed via NPM
```
npm install
```

## Development server

Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Publish
*pfe-ree-node* is provided via our private NPM registry (https://registry.plt.et.tu-dresden.de:4873)
```
npm publish
``` 

## Docker
```
docker run -d -p 8080:80 pfe-ree-viz
```

Build it and deploy it
```
npm run build
docker build -t pfe-ree-viz .
docker tag pfe-ree-node registry.plt.et.tu-dresden.de:443/pfe-ree-viz
docker push registry.plt.et.tu-dresden.de:443/pfe-ree-viz 
```





## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
