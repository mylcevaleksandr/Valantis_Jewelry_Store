# ValantisJewelryStore

## To download project on your local machine run: `git clone https://github.com/mylcevaleksandr/Valantis_Jewelry_Store.git .`

## To run project using Docker:

### 1. Make sure your Docker Desktop is up and running.

### 2. Navigate to the root of the project and run this.command `docker build -t valantis-store-app .` This will create an image named "valantis-store-app" in your docker repository. Run `docker images` to see a list of available images.

### 3. Now run this command: `docker run -p 4200:80 -d valantis-store-app`.

### 4. Navigate to `http://localhost:4200/` to see the working site.

# This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.5.

## To run this project without Docker you need node.js and Angular CLI installed.

## Development server

### 1. Run `npm install` in the project root.

### 2. Run `ng serve` for a dev server.

### 3. Navigate to `http://localhost:4200/` to see the working site.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
