import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'SpanStay API',

      version: '1.0.0',

      description: 'SpanStay Backend API Documentation',
    },

    servers: [
      {
        url: 'http://localhost:4000/api/v1',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',

          scheme: 'bearer',

          bearerFormat: 'JWT',
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ['./src/modules/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
