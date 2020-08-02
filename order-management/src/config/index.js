require("dotenv").config();

const config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  logLevel: process.env.LOG_LEVEL,
  logSilent: process.env.LOG_SILENT == "true",
  secret: process.env.JWT_SECRET,
  retries: process.env.RETRY_COUNT,
  tokenValidateUrl: process.env.TOKEN_VALIDATE_URL,
};

module.exports = config;
