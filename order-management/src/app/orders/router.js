require("./model");
const validateToken = require("../../middlewares/validateToken");
const controller = require("./controller");

const express = require("express");

const router = express.Router();

router.post("/", validateToken, controller.create);
router.get("/:orderId", validateToken, controller.get);
router.put("/:orderId", validateToken, controller.edit);
router.delete("/:orderId", validateToken, controller.delete);

module.exports = router;
