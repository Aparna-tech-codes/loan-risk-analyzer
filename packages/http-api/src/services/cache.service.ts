import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL ?? "redis://127.0.0.1:6379",
});

redisClient.on("connect", () => {
  console.log("🔄 Connecting to Redis...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis Ready");
});

redisClient.on("reconnecting", () => {
  console.log("♻️ Redis Reconnecting...");
});

redisClient.on("error", (error) => {
  console.error("Redis Error:", error);
});

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();

      console.log("✅ Redis Connected");
    }
  } catch (error) {
    console.error(
      "❌ Failed to connect Redis. Application will continue without cache.",
      error,
    );
  }
};

export const getCache = async (key: string) => {
  try {
    if (!redisClient.isReady) {
      return null;
    }

    const value = await redisClient.get(key);

    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Redis GET failed for key: ${key}`, error);

    return null;
  }
};

export const setCache = async (
  key: string,
  value: unknown,
  ttlSeconds = 300,
) => {
  try {
    if (!redisClient.isReady) {
      return;
    }

    await redisClient.set(key, JSON.stringify(value), {
      EX: ttlSeconds,
    });
  } catch (error) {
    console.error(`Redis SET failed for key: ${key}`, error);
  }
};

export const deleteCache = async (key: string) => {
  try {
    if (!redisClient.isReady) {
      return;
    }

    await redisClient.del(key);
  } catch (error) {
    console.error(`Redis DELETE failed for key: ${key}`, error);
  }
};

export const disconnectRedis = async () => {
  try {
    if (redisClient.isOpen) {
      await redisClient.quit();

      console.log("Redis Disconnected");
    }
  } catch (error) {
    console.error("Redis disconnect failed", error);
  }
};
