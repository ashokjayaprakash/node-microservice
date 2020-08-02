const controller = require("./controller");

const express = require("express");

const router = express.Router();

router.post("/", controller.login);
router.get("/", controller.validate);

module.exports = router;
