const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const usersController = require("../controllers/usersController");
const { registerValidator } = require("../utils/validation");

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserById);
router.post("/", registerValidator, usersController.createUser);
router.patch("/:id", auth, usersController.updateUser);
router.delete("/:id", auth, usersController.deleteUser);

module.exports = router;