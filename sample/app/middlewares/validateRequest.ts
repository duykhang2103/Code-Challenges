import { RequestHandler } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (
  schema: AnyZodObject,
  replace: boolean = true
): RequestHandler => {
  return async (req, res, next): Promise<void> => {
    try {
      const data = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      req.body = data.body;
      req.query = data.query;
      req.params = data.params;
      req.cookies = data.cookies;
      return next();
    } catch (error) {
      next(error);
    }
  };
};
