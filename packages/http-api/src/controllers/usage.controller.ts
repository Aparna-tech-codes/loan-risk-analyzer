import { Request, Response } from "express";

import { getUsage } from "../services/usage.service";

export const getUsageController = async (req: Request, res: Response) => {
  const apiKey = req.params.apiKey as string;
  const usage = await getUsage(apiKey);

  return res.json({
    success: true,
    data: {
      apiKey,
      usage,
    },
  });
};
