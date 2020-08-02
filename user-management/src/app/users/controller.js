const jwt = require("jsonwebtoken");
const extractObject = require("../../utilities/").extractObject;
const logger = require("../../utilities/logger");
const repository = require("./repository");
const config = require("../../config");

exports.create = async (req, res) => {
  const user = req.body;
  try {
    logger.info("create user", user);
    const userInfo = await repository.findUserByUserName(user.username);
    if (userInfo) {
      logger.error("User already exists");
      res.preconditionFailed("existing_user");
      return;
    }
    user.status = "ACTIVE";
    const savedUser = await repository.saveUser(user);
    const token = jwt.sign(savedUser.toObject(), config.tokenSecret, {
      expiresIn: parseInt(config.tokenExpireInterval),
    });
    const response = extractObject(savedUser, ["_id", "username", "email"]);
    response.token = token;
    res.success(response);
  } catch (err) {
    logger.error("create user: error", user, err);
    res.send(err);
  }
};

exports.edit = async (req, res) => {
  try {
    logger.info("edit user", req.user.id);
    const user = await validateAndGetUser(req, res);
    if (!user) return;
    const editedUser = await repository.editUser(user, req.body);
    res.success(
      extractObject(editedUser, [
        "id",
        "username",
        "email",
        "firstName",
        "lastName",
        "status",
        "phone",
        "createdAt",
        "updatedAt",
      ])
    );
  } catch (err) {
    logger.error("create user: error", req.user.id, err);
    res.send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    logger.info("delete user", req.user.id);
    const user = await validateAndGetUser(req, res);
    if (!user) return;
    await repository.deleteUser(user, { status: "INACTIVE" });
    res.sendStatus(204);
  } catch (err) {
    logger.error("create user: error", req.user.id, err);
    res.send(err);
  }
};

exports.get = async (req, res) => {
  try {
    logger.info("get user", req.user.id);
    const user = await validateAndGetUser(req, res);
    if (!user) return;
    res.success(
      extractObject(user, [
        "id",
        "username",
        "email",
        "firstName",
        "lastName",
        "status",
        "phone",
        "createdAt",
        "updatedAt",
      ])
    );
  } catch (err) {
    logger.error("create user: error", req.user.id, err);
    res.send(err);
  }
};

const validateAndGetUser = async (req, res) => {
  const user = await repository.findUser(req.user._id);
  if (!user || user.status != "ACTIVE") {
    logger.error("User Not found");
    res.notFound("not_found");
    return;
  }
  return user;
};
