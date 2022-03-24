const db = require("../database");
const Question = db.Question;
const User = db.User;
const createQuestion = async (data) => {
    try {
        return await Question.create(data);
    } catch (err) {
        throw err.message || "Error while creating new question!";
    }
};

const getQuestions = async (filters, orderBy, sort, limit, offset) => {
    try {
        const numberOfQuestions = await Question.findAndCountAll();

        return await Question.findAll({
            where: filters,
            attributes: { exclude: "userId" },
            order: [[orderBy, sort]],
            limit: limit ? limit : numberOfQuestions.count,
            offset: offset,
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: { exclude: "password" },
                },
            ],
        });
    } catch (err) {
        throw err.message || "Error while getting questions list!";
    }
};

const getQuestionById = async (id) => {
    try {
        return await Question.findOne({ where: { id: id }, include: [User] });
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
    deleteQuestion,
};

module.exports = QuestionsService;
