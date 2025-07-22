import { Response } from "express";
import HttpStatus from "http-status-codes";

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  message: string = "Request processed successfully"
) => {
  const statusCodeText = HttpStatus.getStatusText(statusCode);
  const responseData = {
    data: data,
    responseStatus: statusCodeText.toUpperCase().split(" ").join("_"),
    statusCode: statusCode,
    message,
    success: true,
  };
  res.status(statusCode).json(responseData);
};

export const sendRedirectResponse = (res: Response, url: string) => {
  res.redirect(url);
};
