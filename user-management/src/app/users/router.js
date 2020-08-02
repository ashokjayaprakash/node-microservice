require("./model");
const validateToken = require("../../middlewares/validateToken");
const controller = require("./controller");

const express = require("express");

const router = express.Router();

router.post("/", controller.create);
router.get("/:userId", validateToken, controller.get);
router.put("/:userId", validateToken, controller.edit);
router.delete("/:userId", validateToken, controller.delete);

module.exports = router;
