import crypto from "crypto";

export const generateCacheKey = (payload: unknown) => {
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");

  return `risk:${hash}`;
};
