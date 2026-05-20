import { Request, Response, NextFunction } from "express";

import { ZodObject, ZodError } from "zod";

export const validateRequest =
  (schema: ZodObject, target: "body" | "query" | "params" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req[target]);

      next();
    } catch (error) {
      next(error);
    }
  };
