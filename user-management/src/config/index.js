require("dotenv").config();

const config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  logLevel: process.env.LOG_LEVEL,
  logSilent: process.env.LOG_SILENT == "true",
  tokenSecret: process.env.JWT_SECRET,
  tokenExpireInterval: process.env.JWT_EXPIRE_INTERVAL,
};

module.exports = config;
