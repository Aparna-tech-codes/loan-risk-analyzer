import { incrementCache, getCache } from "./cache.service";

const USAGE_PREFIX = "usage:";

export const trackUsage = async (apiKey: string) => {
  return incrementCache(`${USAGE_PREFIX}${apiKey}`);
};

export const getUsage = async (apiKey: string) => {
  return (await getCache(`${USAGE_PREFIX}${apiKey}`)) ?? 0;
};
