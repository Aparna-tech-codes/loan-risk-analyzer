import { getUsage } from "./usage.service";

export const FREE_TIER_LIMIT = 100;

export const checkUsageLimit = async (apiKey: string) => {
  const usage = await getUsage(apiKey);

  return {
    usage,
    limit: FREE_TIER_LIMIT,
    remaining: FREE_TIER_LIMIT - usage,
    exceeded: usage >= FREE_TIER_LIMIT,
  };
};
