const db = require("../database");
const Question = db.Question;

const createQuestion = async (data) => {
    try {
        return await Question.create(data);
    } catch (err) {
        throw err.message || "Error while creating new question!";
    }
};

const getQuestions = async () => {
    try {
        return await Question.findAll();
    } catch (err) {
        throw err.message || "Error while getting questions list!";
    }
};

const getQuestionById = async (id) => {
    try {
        return await Question.findByPk(id);
    } catch (err) {
        throw err.message || "Error while getting question with given ID";
    }
};

const updateQuestion = async (id, data) => {
    try {
        return await Question.update({ ...data }, { where: { id: id } });
    } catch (err) {
        throw err.message || "Error while trying to update question!";
    }
};

const deleteQuestion = async (id) => {
    try {
        return await Question.destroy({ where: { id: id } });
    } catch (err) {
        throw err.message || "Error while trying to delete question!";
    }
};

const QuestionsService = {
    createQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};

module.exports = QuestionsService;