import { format, createLogger, transports } from "winston";
import path from "path";
import config from "../config.js";
const { timestamp, combine, printf, errors, json, label } = format;

const buildLogger = () => {
  const PID = process.pid;
  const logFormat = printf(({ level, message, timestamp, label, stack }) => {
    return `${timestamp} [PID ${label}] ${level}: ${stack || message}`;
  });

  return createLogger({
    level: "info",
    format: combine(label({ label: PID }), errors({ stack: true })),
    transports: [
      new transports.Console({
        format: combine(
          format.colorize(),
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          logFormat
        )
      }),
      new transports.File({
        filename: path.join(config.logsFolder, "warn.log"),
        level: "warn",
        format: combine(timestamp(), json())
      }),
      new transports.File({
        filename: path.join(config.logsFolder, "error.log"),
        level: "error",
        format: combine(timestamp(), json())
      })
    ]
  });
};

export default buildLogger;