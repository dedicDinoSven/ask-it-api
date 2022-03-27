const db = require("../database");
const Question = db.Question;
const User = db.User;
const Sequelize = require("sequelize");

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

const getMostLikedQuestions = async () => {
    try {
        const mostLiked = await Question.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.fn("COUNT", Sequelize.col("ratings.id")),
                        "likesCount",
                    ],
                ],
            },
            include: [
                {
                    model: db.Rating,
                    as: "ratings",
                    attributes: [],
                    where: { value: 1 },
                    required: true,
                    duplicating: false,
                },
                {
                    model: db.User,
                    as: "user",
                    attributes: { exclude: ["password"] },
                },
            ],
            limit: 5,
            group: ["question.id", "user.id"],
            order: [[Sequelize.col("likesCount"), "DESC"]],
        });

        return mostLiked;
    } catch (err) {
        throw err.message || "Error while getting questions list!";
    }
};

const getQuestionById = async (id) => {
    try {
        return await Question.findOne({
            attributes: { exclude: "userId" },
            where: { id: id },
            include: [User],
        });
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
    getMostLikedQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};

module.exports = QuestionsService;
