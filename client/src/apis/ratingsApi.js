import Request from "./index";

class RatingsApi {
    static createQuestionRating(id, data) {
        return Request.post(`/ratings/question/${id}`, data);
    }

    static createAnswerRating(id, data) {
        return Request.post(`/ratings/answer/${id}`, data);
    }

    static getQuestionRatings(id) {
        return Request.get(`/ratings/question/${id}`);
    }

    static getAnswerRatings(id) {
        return Request.get(`/ratings/answer/${id}`);
    }

    static getRatings() {
        return Request.get("/ratings");
    }

    static getRatingById(id) {
        return Request.get(`/ratings/${id}`);
    }

    static updateQuestionRating(id, questionId, data) {
        return Request.patch(`/ratings/question/${questionId}/${id}`, data);
    }

    static updateAnswerRating(id, answerId, data) {
        return Request.patch(`/ratings/answer/${answerId}/${id}`, data);
    }

    static deleteQuestionLike(questionId) {
        return Request.delete(`/ratings/question/${questionId}`,
            { value: 1 });
    }

    static deleteQuestionDislike(questionId) {
        return Request.delete(`/ratings/question/${questionId}`,
            { value: 0 });
    }

    static deleteAnswerLike(answerId) {
        return Request.delete(`/ratings/answer/${answerId}`,
            { value: 1 });
    }

    static deleteAnswerDislike(answerId) {
        return Request.delete(`/ratings/answer/${answerId}`,
            { value: 0 });
    }
}

export default RatingsApi;