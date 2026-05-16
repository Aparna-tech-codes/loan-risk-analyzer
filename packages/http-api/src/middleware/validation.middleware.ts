import { NextFunction, Request, Response } from "express";

import { ZodSchema } from "zod";

type ValidationTarget = "body" | "query" | "params";

export function validateRequest(
  schema: ZodSchema,
  target: ValidationTarget = "body",
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req[target] = schema.parse(req[target]);

      next();
    } catch (error) {
      next(error);
    }
  };
}
