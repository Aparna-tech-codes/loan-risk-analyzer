import { calculateRisk } from "@loan-risk/core";

import { Logger } from "@loan-risk/logger";

const logger = new Logger({
  debug: true,
});

export const performRiskAnalysis = async (data: unknown) => {
  return calculateRisk(data as never, undefined, {
    logger,
  });
};
