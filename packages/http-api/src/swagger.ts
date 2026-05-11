import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Loan Risk Analyzer API",

      version: "1.0.0",

      description: "Professional loan risk analysis engine API",
    },

    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },

  apis: ["./src/server.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
