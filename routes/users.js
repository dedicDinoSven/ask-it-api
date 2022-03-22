const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const usersController = require("../controllers/usersController");

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.createUser);
router.patch("/:id", auth, usersController.updateUser);
router.delete("/:id", auth, usersController.deleteUser);

module.exports = router;