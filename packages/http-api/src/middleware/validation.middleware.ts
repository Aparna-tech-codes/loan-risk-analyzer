import { Request, Response, NextFunction } from "express";

import { ZodSchema } from "zod";

export const validateRequest = (
  schema: ZodSchema,
  source: "body" | "query" | "params" = "body",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];

    const result = schema.safeParse(data);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: result.error.issues[0]?.message ?? "Validation failed",
          details: result.error.flatten(),
        },
      });
    }

    req[source] = result.data as any;

    next();
  };
};
