# PuntoMotor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


##Despliegue en GitHub Pages

Para desplegar en GitHub Pages, ejecuta los siguientes comandos:

### Método 1: Script automatizado (Recomendado)
```bash
# Instalar gh-pages (solo la primera vez)
npm install --save-dev gh-pages

# Construir y desplegar en un solo comando
npm run deploy:github
```

### Método 2: Comandos manuales
```bash
# 1. Construir el proyecto para producción
npm run build:prod
# o manualmente: ng build --base-href "/PuntoMotor/"

# 2. Desplegar a GitHub Pages
npm run deploy
# o manualmente: npx gh-pages -d dist/punto-motor/browser
```

### Scripts disponibles en package.json:
- `npm run build:prod` - Construye para producción con base-href correcto
- `npm run deploy` - Despliega la carpeta dist a GitHub Pages
- `npm run deploy:github` - Construye y despliega en un solo comando

Web Desplegada: https://javiervarc.github.io/PuntoMotor/home