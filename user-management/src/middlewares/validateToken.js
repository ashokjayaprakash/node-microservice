const jwt = require("jsonwebtoken");
const logger = require("../utilities/logger");
const config = require("../config");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (token) {
    return jwt.verify(token, config.tokenSecret, function (err, decoded) {
      if (err) {
        logger.error(err);
        return res.unauthorized();
      }
      req.user = decoded;
      return next();
    });
  }
  return res.unauthorized();
};
