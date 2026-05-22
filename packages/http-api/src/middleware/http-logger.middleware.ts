import pinoHttp from "pino-http";

import { logger } from "../services/logger.service";

export const httpLoggerMiddleware = pinoHttp({
  logger,

  customProps(req) {
    return {
      requestId: req.headers["x-request-id"],
    };
  },

  customSuccessMessage(req, res) {
    return `${req.method} ${req.url} completed`;
  },

  customErrorMessage(req, res) {
    return `${req.method} ${req.url} failed`;
  },
});
