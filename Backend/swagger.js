const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Voting app',
      version: '1.0.0',
      description: 'Description of your API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server',
      },
    ],
  },
  apis: ['./routes/*.js'],};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
