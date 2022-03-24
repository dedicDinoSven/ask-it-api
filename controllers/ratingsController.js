const RatingsService = require("../services/ratingsService");
const jwt = require("jsonwebtoken");

const createQuestionRating = async (req, res) => {
    const data = {
        value: req.body.value,
        userId: req.user,
        questionId: req.params.id
    };
    try {
        const rating = await RatingsService.createQuestionRating(data);

        res.status(201).send(rating);
    } catch (err) {
        res.status(500).send({ message: err }).end();
    }
};

const createAnswerRating = async (req, res) => {
    const data = {
        value: req.body.value,
        userId: req.user,
        answerId: req.params.id
    };
    try {
        const rating = await RatingsService.createAnswerRating(data);

        res.status(201).send(rating);
    } catch (err) {
        res.status(500).send({ message: err }).end();
    }
};

const getQuestionRatings = async (req, res) => {
    try {
        const ratings = await RatingsService.getQuestionRatings(req.params.id);

        res.status(200).send(ratings);
    } catch (err) {
        res.status(404).send({ message: err }).end();
    }
};

const getAnswerRatings = async (req, res) => {
    try {
        const ratings = await RatingsService.getAnswerRatings(req.params.id);

        res.status(200).send(ratings);
    } catch (err) {
        res.status(404).send({ message: err }).end();
    }
};

const getRatings = async (req, res) => {
    try {
        const ratings = await RatingsService.getRatings();

        res.status(200).send(ratings);
    } catch (err) {
        res.status(404).send({ message: err }).end();
    }
};
const getRatingById = async (req, res) => {
    try {
        const rating = await RatingsService.getRatingById(req.params.id);

        res.status(200).send(rating);
    } catch (err) {
        res.status(404).send({ message: err }).end();
    }
};

const updateQuestionRating = async (req, res) => {
    const id = req.params.id;
    const questionId = req.params.questionId;
    const value = req.body.value;
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        if (req.user === decoded.id) {
            const rating = await RatingsService.updateQuestionRating(id,
                questionId, value);
            return res.status(200).send(rating);
        } else {
            res.status(403).send({
                message: "You are not allowed to update this rating!",
            }).end();
        }
    } catch (err) {
        res.status(403).send({ message: err }).end();
    }
};

const updateAnswerRating = async (req, res) => {
    const id = req.params.id;
    const answerId = req.params.answerId;
    const value = req.body.value;
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        if (req.user === decoded.id) {
            const rating = await RatingsService.updateAnswerRating(id, answerId,
                value);
            return res.status(200).send(rating);
        } else {
            res.status(403).send({
                message: "You are not allowed to update this rating!",
            }).end();
        }
    } catch (err) {
        res.status(403).send({ message: err }).end();
    }
};

const deleteQuestionRating = async (req, res) => {
    const { id, questionId } = req.params;
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        if (req.user === decoded.id) {
            const rating = await RatingsService.getRatingById(id);

            if (!rating)
                return res.status(404)
                    .send({ message: "Rating does not exist!" });

            const deletedRating = await RatingsService.deleteQuestionRating(id,
                questionId);

            res.status(200)
                .send({ message: "Rating deleted!", rating: deletedRating });
        } else {
            res.status(403).send({
                message: "You are not allowed to delete this rating!",
            });
        }
    } catch
        (err) {
        res.status(500).send({ message: err }).end();
    }
};

const deleteAnswerRating = async (req, res) => {
    const { id, answerId } = req.params;
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        if (req.user === decoded.id) {
            const rating = await RatingsService.getRatingById(id);

            if (!rating)
                return res.status(404)
                    .send({ message: "Rating does not exist!" });

            const deletedRating = await RatingsService.deleteAnswerRating(id,
                answerId);

            res.status(200)
                .send({ message: "Rating deleted!", rating: deletedRating });
        } else {
            res.status(403).send({
                message: "You are not allowed to delete this rating!",
            });
        }
    } catch
        (err) {
        res.status(500).send({ message: err }).end();
    }
};


const RatingsController = {
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

module.exports = RatingsController;