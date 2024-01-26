const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Daily Music Choice API',
      version: '1.0.0',
      description: 'API documentation for Daily Music Choice',
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

module.exports = specs;