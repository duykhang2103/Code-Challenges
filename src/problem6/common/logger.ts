import { createLogger, format, transports } from "winston";
import moment from "moment";
const { printf, combine, colorize } = format;

const getTimestamp = () => {
  const date = new Date();
  const formatted = moment(date).format("MMM-DD-YYYY HH:mm:ss");
  return formatted;
};

const logFormat = printf(({ level, message }) => {
  return `${getTimestamp()} ${level}: ${message}`;
});

export const infoLogger = createLogger({
  level: "info",
  format: combine(colorize(), logFormat),
  transports: [new transports.Console()],
});

export const errorLogger = createLogger({
  level: "error",
  format: combine(colorize(), logFormat),
  transports: [new transports.Console()],
});
