const config = require("./../config");
const logger = require("../utilities/logger");
const { requestInterface } = require("../utilities/request-interface");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];
  // return next();
  if (!token) return res.unauthorized();
  return requestInterface({
    method: "GET",
    url: config.tokenValidateUrl,
    headers: {
      authorization: token,
    },
  })
    .then((response) => {
      req.user = { id: response.data.payload._id };
      return next();
    })
    .catch((err) => {
      logger.error(err);
      return res.unauthorized();
    });
};
