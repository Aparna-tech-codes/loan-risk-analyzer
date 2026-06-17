import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Loan Risk Analyzer API",

      version: "1.0.0",

      description:
        "Enterprise-grade loan risk analysis API built with TypeScript, Express, Zod, and modular risk-engine architecture.",

      contact: {
        name: "Aparna Nikam",

        url: "https://github.com/Aparna-tech-codes",

        email: "aparnanikam95@gmail.com",
      },

      license: {
        name: "MIT",

        url: "https://opensource.org/licenses/MIT",
      },
    },

    servers: [
      {
        url: "http://localhost:4000",

        description: "Local Development Server",
      },
    ],

    tags: [
      {
        name: "Health",
        description: "Health and readiness endpoints",
      },
      {
        name: "Risk Analysis",
        description: "Loan risk analysis operations",
      },
      {
        name: "Audit",
        description: "Audit log APIs",
      },
      {
        name: "Metrics",
        description: "Monitoring metrics",
      },
      {
        name: "Tracing",
        description: "OpenTelemetry tracing",
      },
      {
        name: "Meta",
        description: "API metadata",
      },
    ],

    components: {
      schemas: {
        AnalyzeRequest: {
          type: "object",
          required: [
            "fullName",
            "age",
            "monthlyIncome",
            "monthlyEMI",
            "requestedLoanAmount",
            "creditScore",
            "employmentType",
          ],
          properties: {
            fullName: {
              type: "string",
              example: "Aparna Nikam",
            },
            age: {
              type: "number",
              example: 30,
            },
            monthlyIncome: {
              type: "number",
              example: 75000,
            },
            monthlyEMI: {
              type: "number",
              example: 15000,
            },
            requestedLoanAmount: {
              type: "number",
              example: 500000,
            },
            creditScore: {
              type: "number",
              example: 780,
            },
            employmentType: {
              type: "string",
              enum: ["SALARIED", "SELF_EMPLOYED"],
              example: "SALARIED",
            },
          },
        },

        AnalyzeSuccessResponse: {
          type: "object",

          properties: {
            success: {
              type: "boolean",

              example: true,
            },

            timestamp: {
              type: "string",

              example: "2026-05-20T12:00:00.000Z",
            },

            requestId: {
              type: "string",

              example: "req_123456789",
            },

            data: {
              type: "object",

              properties: {
                score: {
                  type: "number",

                  example: 100,
                },

                riskLevel: {
                  type: "string",

                  example: "LOW",
                },

                approved: {
                  type: "boolean",

                  example: true,
                },

                reasons: {
                  type: "array",

                  items: {
                    type: "string",
                  },
                },

                explanations: {
                  type: "array",

                  items: {
                    type: "object",

                    properties: {
                      rule: {
                        type: "string",

                        example: "CREDIT_SCORE_RULE",
                      },

                      impact: {
                        type: "number",

                        example: 20,
                      },
                    },
                  },
                },
              },
            },
          },
        },

        ErrorResponse: {
          type: "object",

          properties: {
            success: {
              type: "boolean",

              example: false,
            },

            timestamp: {
              type: "string",

              example: "2026-05-20T12:00:00.000Z",
            },

            requestId: {
              type: "string",

              example: "req_123456789",
            },

            error: {
              type: "string",

              example: "Validation failed",
            },

            code: {
              type: "string",

              example: "VALIDATION_ERROR",
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/**/*.ts", "./src/routes/*.ts"],
});

const spec = swaggerSpec as any;

console.log("Swagger Paths:", spec.paths);
