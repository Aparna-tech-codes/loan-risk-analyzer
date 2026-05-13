"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
const core_1 = require("@loan-risk/core");
const logger_1 = require("@loan-risk/logger");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
const logger = new logger_1.Logger({
    debug: true,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: API running successfully
 */
app.get("/health", (_req, res) => {
    res.json({
        success: true,
        message: "API Running",
    });
});
/**
 * @swagger
 * /analyze:
 *   post:
 *     summary: Analyze loan applicant risk
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: number
 *               monthlyIncome:
 *                 type: number
 *               creditScore:
 *                 type: number
 *     responses:
 *       200:
 *         description: Risk analysis result
 */
app.post("/analyze", async (req, res) => {
    try {
        logger.info("Risk analyze request received");
        const result = await (0, core_1.calculateRisk)(req.body, undefined, {
            logger,
        });
        res.json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        logger.error("Risk analysis failed");
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    logger.info(`HTTP API running on port ${PORT}`);
});
