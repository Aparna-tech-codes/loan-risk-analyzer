import { Logger } from "./src";

const logger = new Logger({
  debug: true,
});

logger.info("Application started");

logger.warn("Low credit score");

logger.error("Fraud detected");

logger.debug("Debugging enabled");