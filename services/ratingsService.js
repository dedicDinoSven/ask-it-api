const db = require("../database");
const Rating = db.Rating;

const createQuestionRating = async (data) => {
    try {
        const question = await db.Question.findByPk(data.questionId);

        if (question.userId === data.userId)
            throw new Error("You cannot rate your own question!");

        return await Rating.create({
            value: data.value,
            userId: data.userId,
            questionId: data.questionId,
        });
    } catch (err) {
        throw err.message || "Error while creating new question rating!";
    }
};

const createAnswerRating = async (data) => {
    try {
        const answer = await db.Answer.findByPk(data.answerId);

        if (answer.userId === data.userId)
            throw new Error("You cannot rate your own answer!");

        return await Rating.create({
            value: data.value,
            userId: data.userId,
            answerId: data.answerId,
        });
    } catch (err) {
        throw err.message || "Error while creating new answer rating!";
    }
};

const getQuestionRatings = async (id) => {
    try {
        const likes = await Rating.findAll({
            attributes: ["id", "questionId", "value", "userId"],
            where: { questionId: id, value: 1 },
        });

        const dislikes = await Rating.findAll({
            attributes: ["id", "questionId", "value", "userId"],
            where: { questionId: id, value: 0 },
        });

        return { likes, dislikes };
    } catch (err) {
        throw err.message || "Error while getting question ratings!";
    }
};

const getAnswerRatings = async (id) => {
    try {
        const likes = await Rating.findAll({
            attributes: ["id", "answerId", "value", "userId"],
            where: { answerId: id, value: 1 },
        });

        const dislikes = await Rating.findAll({
            attributes: ["id", "answerId", "value", "userId"],
            where: { answerId: id, value: 0 },
        });

        return { likes, dislikes };
    } catch (err) {
        throw err.message || "Error while getting answer ratings!";
    }
};

const getRatings = async () => {
    return await Rating.findAll().catch((err) => {
        throw err.message || "Error while getting answer ratings!";
    });
};

const getRatingById = async (id) => {
    return await Rating.findByPk(id).catch((err) => {
        throw err.message || "Error while getting answer ratings!";
    });
};

const updateQuestionRating = async (id, questionId, value) => {
    try {
        const rating = await Rating.findOne({
            where: {
                id: id,
                questionId: questionId,
            },
        });

        if (!rating) throw new Error("Rating does not exist!");

        if (!value) throw new Error("Value is required!");

        rating.value = value;

        await rating.save();

        return await Rating.findByPk(id);
    } catch (err) {
        throw err.message || "Error while trying to update question rating!";
    }
};

const updateAnswerRating = async (id, answerId, value) => {
    try {
        const rating = await Rating.findOne({
            where: {
                id: id,
                answerId: answerId,
            },
        });

        if (!rating) throw new Error("Rating does not exist!");

        if (!value) throw new Error("Value is required!");

        rating.value = value;

        await rating.save();

        return await Rating.findByPk(id);
    } catch (err) {
        throw err.message || "Error while trying to update answer rating!";
    }
};

const deleteQuestionRating = async (questionId, userId, value) => {
    try {
        return await Rating.destroy({
            where: { questionId: questionId, userId: userId, value: value },
        });
    } catch (err) {
        throw err.message || "Error while trying to delete question rating!";
    }
};

const deleteAnswerRating = async (answerId, userId, value) => {
    try {
        return await Rating.destroy({
            where: { answerId: answerId, userId: userId, value: value },
        });
    } catch (err) {
        throw err.message || "Error while trying to delete answer rating!";
    }
};

const RatingsService = {
    createQuestionRating,
    createAnswerRating,
    getQuestionRatings,
    getAnswerRatings,
    getRatings,
    getRatingById,
    updateQuestionRating,
    updateAnswerRating,
    deleteQuestionRating,
    deleteAnswerRating,
};

module.exports = RatingsService;
