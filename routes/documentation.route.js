var express = require('express');
var router = express.Router();

var swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./**/routes/*.js','routes.js'],// pass all in array 
  };

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

var router = express.Router();

// serve swagger 
router.get('/', function(req, res) {   
  res.setHeader('Content-Type', 'application/json');   
  res.send(swaggerSpec); 
});



module.exports = router;


