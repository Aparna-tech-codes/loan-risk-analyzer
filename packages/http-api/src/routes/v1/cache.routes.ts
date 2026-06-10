import { Router } from "express";

import { getCache, setCache } from "../../services/cache.service";

const router: Router = Router();

router.get("/cache-test", async (_req, res) => {
  await setCache(
    "test-key",
    {
      message: "Hello Redis",
    },
    60,
  );

  const value = await getCache("test-key");

  res.json({
    success: true,
    value,
  });
});

export default router;
