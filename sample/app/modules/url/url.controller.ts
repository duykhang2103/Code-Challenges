import { Request, Response, NextFunction } from "express";
import { urlService } from "./url.service";
import {
  sendRedirectResponse,
  sendSuccessResponse,
} from "../../../common/successResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url, expiresAt, password, custom } = req.body;
    const shortUrl = await urlService.create(url, expiresAt, password, custom);
    sendSuccessResponse(res, shortUrl, 201, "URL shortened successfully");
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit } = req.query as { limit: string | undefined };
    const urls = await urlService.list(limit);
    sendSuccessResponse(res, urls, 200, "URLs fetched successfully");
  } catch (error) {
    next(error);
  }
};

const redirect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    const originalUrl = await urlService.redirect(code);
    sendRedirectResponse(res, originalUrl);
  } catch (error) {
    next(error);
  }
};

const deleteUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    await urlService.deleteUrl(code);
    sendSuccessResponse(res, null, 204, "URL deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const urlController = {
  create,
  list,
  redirect,
  deleteUrl,
};
