"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
