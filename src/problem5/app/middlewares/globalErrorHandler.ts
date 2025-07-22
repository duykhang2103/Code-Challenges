import "colors";
import { ErrorRequestHandler } from "express";
import HttpStatus from "http-status-codes";
import { keys } from "../../config/const";
import ApiError, { IGenericErrorMessage } from "../../common/error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (keys.NODE_ENV === "development") {
    console.log(
      "Error on Route --> ".red,
      req.path.yellow,
      `[${req.method}]`.green
    );
    console.log(error);
  }
  let type = "ApiError";
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: IGenericErrorMessage[] = [];
  if (error instanceof ApiError) {
    type = "ApiError";
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.message ? [{ path: "", message: error.message }] : [];
  } else if (error instanceof Error) {
    type = "Error";
    message = error.message;
    errorMessages = error.message ? [{ path: "", message: error.message }] : [];
  }

  const statusCodeText = HttpStatus.getStatusText(statusCode);
  res.status(statusCode).json({
    type,
    success: false,
    message,
    statusCode,
    errorMessages,
    responseStatus: statusCodeText.toUpperCase().split(" ").join("_"),
    stack: keys.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
