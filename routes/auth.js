const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { loginValidator } = require("../utils/validation");

router.post("/login", loginValidator, authController.login);

module.exports = router;