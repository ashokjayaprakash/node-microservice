const winston = require("winston");
const fs = require("fs");

const config = require("../config");

const tsFormat = () => new Date().toLocaleTimeString();
const logDir = "log";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: tsFormat,
      level: config.logLevel,
      silent: config.logSilent,
    }),
    new winston.transports.File({
      filename: `${logDir}/results.log`,
      timestamp: tsFormat,
      level: config.logLevel,
      silent: config.logSilent,
    }),
  ],
});

logger.log("HELLO");

module.exports = logger;
