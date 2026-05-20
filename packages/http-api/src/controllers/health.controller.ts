import { Request, Response } from "express";

import { sendSuccessResponse } from "../utils/api-response";

export const getHealth = (_req: Request, res: Response) => {
  return sendSuccessResponse(res, {
    message: "API Running",
  });
};
