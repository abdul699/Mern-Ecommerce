# Mern-Ecommerce

## A t-shirt store using MongoDB, Express, React and Node

To download all the dependencies and components download the file `package.json` and use command: `npm install`

### The project structure is as follows:

1. **Back End:**  
   Folder **projbackend** contains the backend logic and database connection to mongoose  
   To run the backend server run the command: `npm start`

   > ```
   > projbackend
   > |───controllers: Contains the logic to process the routes
   > |───models: Contains the database Schema
   > |───routes: Contains the urls routing for the app
   > └───app.js: This is the entry point for the backend. This file calls the models, routes, controllers, middlewares and connect the DB to 
   > server
   > ```

2. **Front End:**  
   Folder **projfrontend** contains the frontend logic using React  
   To run the frontend App use command: `npm start`
