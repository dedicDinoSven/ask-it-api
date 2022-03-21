const QuestionsService = require("../services/questionsService");
const jwt = require("jsonwebtoken");

const createQuestion = async (req, res) => {
    const data = {
        title: req.body.title,
        text: req.body.text,
        userId: req.user.id
    };

    try {
        const question = await QuestionsService.createQuestion(data);
        res.status(201).send(question);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err }).end();
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await QuestionsService.getQuestions();

        res.status(200).send(questions);
    } catch (err) {
        res.status(500).send({ message: err.message }).end();
    }
};

const getQuestionById = async (req, res) => {
    try {
        const question = await QuestionsService.getQuestionById(req.params.id);

        if (!question) {
            return res.status(404)
                .send({ message: "Question not found!" })
                .end();
        }

        res.status(200).send(question);
    } catch (err) {

    }
};

const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        const question = await QuestionsService.getQuestionById(id);

        if (!question) {
            return res.status(404)
                .send({ message: "Question does not exist!" })
                .end();
        }

        if (question?.userId.toString() === decoded.user.id.toString()) {
            await QuestionsService.updateQuestion(id, data);
            const updatedQuestion = await QuestionsService.getQuestionById(id);

            return res.status(200).send(updatedQuestion);
        } else {
            res.status(403).send({
                message: "You are not authorized to update this question!"
            }).end();
        }
    } catch (err) {
        res.status(403).send({ message: err.message }).end();
    }
};

const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try {
        const question = await QuestionsService.getQuestionById(id);

        if (!question) {
            return res.status(404).send({ message: "Question does not exist!" })
        }

        if (question?.userId.toString() === decoded.user.id.toString()) {
            await QuestionsService.deleteQuestion(id);

            return res.status(200).send({ message: "Question deleted!"});
        } else {
            res.status(403).send({
                message: "You are not authorized to delete this question!"
            }).end();
        }
    } catch (err) {
        res.status(500).send({ message: err.message }).end();
    }
};

const QuestionController = {
    createQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};

module.exports = QuestionController;