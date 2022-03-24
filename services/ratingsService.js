const db = require("../database");
const Rating = db.Rating;

const createQuestionRating = async (data) => {
    try {
        return await Rating.create({
            value: data.value,
            userId: data.userId,
            questionId: data.questionId
        });
    } catch (err) {
        throw err.message || "Error while creating new question rating!";
    }
};

const createAnswerRating = async (data) => {
    try {
        return await Rating.create({
            value: data.value,
            userId: data.userId,
            answerId: data.answerId
        });
    } catch (err) {
        throw err.message || "Error while creating new answer rating!";
    }
};

const getQuestionRatings = async (id) => {
    try {
        return await Rating.findAll({
            where: { questionId: id }
        });
    } catch (err) {
        throw err.message || "Error while getting question ratings!";
    }
};

const getAnswerRatings = async (id) => {
    try {
        return await Rating.findAll({
            where: { answerId: id }
        });
    } catch (err) {
        throw err.message || "Error while getting answer ratings!";
    }
};

const getRatings = async () => {
    try {
        return await Rating.findAll();
    } catch (err) {
        throw err.message || "Error while getting answer ratings!";
    }
};

const getRatingById = async (id) => {
    try {
        return await Rating.findByPk(id);
    } catch (err) {
        throw err.message || "Error while getting answer ratings!";
    }
};

const updateQuestionRating = async (id, questionId, value) => {
    try {
        const rating = await Rating.findOne({
            where: {
                id: id,
                questionId: questionId
            }
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
                answerId: answerId
            }
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

const deleteQuestionRating = async (id, questionId) => {
    try {
        return await Rating.destroy(
            { where: { id: id, questionId: questionId } });
    } catch (err) {
        throw err.message || "Error while trying to delete question rating!";
    }
};

const deleteAnswerRating = async (id, answerId) => {
    try {
        return await Rating.destroy(
            { where: { id: id, answerId: answerId } });
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
    deleteAnswerRating
};

module.exports = RatingsService;