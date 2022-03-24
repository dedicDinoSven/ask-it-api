const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const answersController = require("../controllers/answersController");

router.get("/question/:id", answersController.getAnswersByQuestionId);
router.get("/:id", answersController.getAnswerById);
router.post("/:id", auth, answersController.createAnswer);
router.patch("/:id", auth, answersController.updateAnswer);
router.delete("/:id", auth, answersController.deleteAnswer);

module.exports = router;
