const AnswersService = require("../services/answersService");
const jwt = require("jsonwebtoken");
const RatingsService = require("../services/ratingsService");

const createAnswer = async (req, res) => {
    const data = {
        text: req.body.text,
        userId: req.user,
        questionId: req.params.id,
    };

    try {
        const answer = await AnswersService.createAnswer(data);
        res.status(201).send(answer);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err }).end();
    }
};

const getAnswersByQuestionId = async (req, res) => {
    try {
        let answers = await AnswersService.getAnswersByQuestionId(
            req.params.id
        );
        for (let i = 0; i < answers.length; ++i) {
            answers[i].ratings = await RatingsService.getAnswerRatings(
                answers[i].id
            );
        }
        console.log(answers);
        res.status(200).send(answers);
    } catch (err) {
        res.status(500).send({ message: err }).end();
    }
};

const getAnswerById = async (req, res) => {
    try {
        const answer = await AnswersService.getAnswerById(req.params.id);

        if (!answer) {
            return res.status(404).send({ message: "Answer not found!" }).end();
        }
        const ratings = await RatingsService.getAnswerRatings(req.params.id);

        res.status(200).send({ answer, ratings });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

const updateAnswer = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        const answer = await AnswersService.getAnswerById(id);

        if (!answer) {
            return res
                .status(404)
                .send({ message: "Answer does not exist!" })
                .end();
        }

        if (answer?.userId.toString() === decoded.id.toString()) {
            await AnswersService.updateAnswer(id, data);
            const updatedAnswer = await AnswersService.getAnswerById(id);

            return res.status(200).send(updatedAnswer);
        } else {
            res.status(403)
                .send({
                    message: "You are not authorized to update this answer!",
                })
                .end();
        }
    } catch (err) {
        res.status(403).send({ message: err.message }).end();
    }
};

const deleteAnswer = async (req, res) => {
    const { id } = req.params;
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try {
        const answer = await AnswersService.getAnswerById(id);

        if (!answer) {
            return res.status(404).send({ message: "Answer does not exist!" });
        }

        if (answer?.userId.toString() === decoded.id.toString()) {
            await AnswersService.deleteAnswer(id);

            return res
                .status(200)
                .send({ message: "Answer deleted!", answer: answer });
        } else {
            res.status(403)
                .send({
                    message: "You are not authorized to delete this answer!",
                })
                .end();
        }
    } catch (err) {
        res.status(500).send({ message: err.message }).end();
    }
};

const AnswersController = {
    createAnswer,
    getAnswersByQuestionId,
    getAnswerById,
    updateAnswer,
    deleteAnswer,
};

module.exports = AnswersController;
