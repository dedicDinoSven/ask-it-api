import Request from "./index";

class AnswersApi {
    static createAnswer(questionId, data) {
        return Request.post(`/answers/${questionId}`, data);
    }

    static getAnswersByQuestionId(id) {
        return Request.get(`/answers/question/${id}`);
    }

    static getAnswerById(id) {
        return Request.get(`/answers/${id}`);
    }

    static updateAnswer(id, data) {
        return Request.patch(`/answers/${id}`, data);
    }

    static deleteAnswer(id) {
        return Request.delete(`/answers/${id}`);
    }

}

export default AnswersApi;