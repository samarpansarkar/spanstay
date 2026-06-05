import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'StayFinder API',
      version: '1.0.0',
      description: 'StayFinder backend API documentation',
    },

    servers: [
      {
        url: 'http://localhost:4000/api/v1',
      },
    ],
  },

  apis: ['./src/modules/**/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
