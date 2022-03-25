const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const questionsController = require("../controllers/questionsController");

router.get("/", questionsController.getQuestions);
router.get("/most-liked", questionsController.getMostLikedQuestions);
router.get("/:id", questionsController.getQuestionById);
router.post("/", auth, questionsController.createQuestion);
router.patch("/:id", auth, questionsController.updateQuestion);
router.delete("/:id", auth, questionsController.deleteQuestion);

module.exports = router;
