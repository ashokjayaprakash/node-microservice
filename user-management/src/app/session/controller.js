const jwt = require("jsonwebtoken");
const repository = require("./repository");

const config = require("../../config");
const logger = require("../../utilities/logger");

exports.login = async (req, res) => {
  if (!req.body.password || !req.body.username) {
    res.preconditionFailed("Credentials required");
    return;
  }

  try {
    const user = await repository.findUser(req.body);
    if (!user || !user.checkPass(req.body.password)) {
      res.json({ success: false, message: "Authentication failed." });
      return;
    }

    const token = jwt.sign(user.toObject(), config.tokenSecret, {
      expiresIn: 1440,
    });
    logger.info("User loged in with success. Login token", user._id);
    res.json({
      success: true,
      token,
      _id: user._id,
    });
  } catch (err) {
    res.send(err);
  }
};

let counter = 0;

exports.validate = async (req, res) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, config.tokenSecret, function (err, decoded) {
      if (err) {
        logger.error(err);
        return res.unauthorized();
      }
      const response = { _id: decoded._id, token };
      return res.success(response);
    });
  } else {
    return res.unauthorized();
  }
};
