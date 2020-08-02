const jwt = require("jsonwebtoken");
const extractObject = require("../../utilities/").extractObject;
const logger = require("../../utilities/logger");
const repository = require("./repository");
const config = require("../../config");

exports.create = async (req, res) => {
  const order = req.body;
  try {
    order.status = "PLACED";
    order.userId = req.user.id;
    const savedOrder = await repository.saveOrder(order);
    res.success(savedOrder);
  } catch (err) {
    logger.error("create order: error", order, err);
    res.send(err);
  }
};

exports.edit = async (req, res) => {
  try {
    logger.info("edit order", req.params.orderId);
    const order = await validateAndGetOrder(req, res);
    if (!order) return;
    const editedOrder = await repository.editOrder(order, req.body);
    res.success(editedOrder);
  } catch (err) {
    logger.error("create order: error", req.params.orderId, err);
    res.send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    logger.info("delete order", req.params.orderId);
    const order = await validateAndGetOrder(req, res);
    if (!order) return;
    await repository.deleteOrder(order, { status: "CANCELLED" });
    res.sendStatus(204);
  } catch (err) {
    logger.error("create order: error", req.params.orderId, err);
    res.send(err);
  }
};

exports.get = async (req, res) => {
  try {
    logger.info("get order", req.params.orderId);
    const order = await validateAndGetOrder(req, res);
    if (!order) return;
    res.success(order);
  } catch (err) {
    logger.error("create order: error", req.params.orderId, err);
    res.send(err);
  }
};

const validateAndGetOrder = async (req, res) => {
  const order = await repository.findOrder(req.params.orderId);
  if (!order) {
    logger.error("Order Not found");
    res.notFound("not_found");
    return;
  }
  return order;
};
