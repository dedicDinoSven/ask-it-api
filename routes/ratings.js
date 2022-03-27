const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ratingsController = require("../controllers/ratingsController");

router.get("/question/:id", ratingsController.getQuestionRatings);
router.get("/answer/:id", ratingsController.getAnswerRatings);
router.post("/question/:id", auth, ratingsController.createQuestionRating);
router.post("/answer/:id", auth, ratingsController.createAnswerRating);
router.get("/", ratingsController.getRatings);
router.get("/:id", ratingsController.getRatingById);
router.patch("/question/:questionId/:id", auth,
    ratingsController.updateQuestionRating);
router.patch("/answer/:answerId/:id", auth,
    ratingsController.updateAnswerRating);
router.delete("/question/:questionId", auth,
    ratingsController.deleteQuestionRating);
router.delete("/answer/:answerId", auth,
    ratingsController.deleteAnswerRating);

module.exports = router;