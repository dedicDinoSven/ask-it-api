const db = require("../database");
const Answer = db.Answer;
const User = db.User;

const createAnswer = async (data) => {
    try {
        const answer = await Answer.create(data);

        const createdAnswer = await Answer.findByPk(answer.id, {
            attributes: { exclude: "userId" },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: { exclude: "password" },
                },
            ],
        });

        console.log(answer);
        return createdAnswer;
    } catch (err) {
        throw err.message || "Error while creating new answer!";
    }
};

const getAnswersByQuestionId = async (id) => {
    try {
        return await Answer.findAll({
            where: { questionId: id },
            attributes: { exclude: "userId" },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: { exclude: "password" },
                },
            ],
        });
    } catch (err) {
        throw err.message || "Error while getting answers list!";
    }
};

const getAnswerById = async (id) => {
    try {
        return await Answer.findByPk(id);
    } catch (err) {
        throw err.message || "Error while getting answer with given ID";
    }
};

const updateAnswer = async (id, data) => {
    try {
        return await Answer.update({ ...data }, { where: { id: id } });
    } catch (err) {
        throw err.message || "Error while trying to update answer!";
    }
};

const deleteAnswer = async (id) => {
    try {
        return await Answer.destroy({ where: { id: id } });
    } catch (err) {
        throw err.message || "Error while trying to delete answer!";
    }
};

const AnswerService = {
    createAnswer,
    getAnswersByQuestionId,
    getAnswerById,
    updateAnswer,
    deleteAnswer,
};

module.exports = AnswerService;
