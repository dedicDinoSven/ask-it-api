const db = require("../database");
const Answer = db.Answer;

const createAnswer = async (data) => {
    try {
        return await Answer.create(data);
    } catch (err) {
        throw err.message || "Error while creating new answer!";
    }
};

const getAnswers = async () => {
    try {
        return await Answer.findAll();
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
    getAnswers,
    getAnswerById,
    updateAnswer,
    deleteAnswer
};

module.exports = AnswerService;