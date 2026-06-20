import { Request, Response } from "express";

import { checkUsageLimit } from "../services/limit.service";

export const getLimitController = async (req: Request, res: Response) => {
  const apiKey = req.params.apiKey as string;

  const limit = await checkUsageLimit(apiKey);

  return res.json({
    success: true,
    data: limit,
  });
};
