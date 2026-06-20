import { incrementCache, getCache, setCache } from "./cache.service";

const USAGE_PREFIX = "usage:";

const getTodayKey = (apiKey: string) => {
  const today = new Date().toISOString().split("T")[0];

  return `${USAGE_PREFIX}${apiKey}:${today}`;
};

export const trackUsage = async (apiKey: string) => {
  const key = getTodayKey(apiKey);

  const current = (await getCache(key)) ?? 0;

  const next = current + 1;

  await setCache(
    key,
    next,
    60 * 60 * 24, // 24 hours
  );

  return next;
};

export const getUsage = async (apiKey: string) => {
  const key = getTodayKey(apiKey);

  return (await getCache(key)) ?? 0;
};
