import React, { useEffect, useState } from "react";
import Question from "./question/question";
import AnswerForm from "./answerForm/answerForm";
import Button from "../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import Answer from "./answer/answer";
import { useParams } from "react-router";
import { getQuestionById } from "../../redux/questionSlice";
import {
    createAnswer,
    deleteAnswer,
    getAnswersByQuestionId,
    updateAnswer
} from "../../redux/answerSlice";
import RatingsApi from "../../apis/ratingsApi";

const QuestionPage = () => {
        const [formVisible, setFormVisible] = useState(false);
        const [newAnswer, setNewAnswer] = useState("");
        const [editAnswer, setEditAnswer] = useState("");
        const [questionRating, setQuestionRating] = useState({
            liked: false, disliked: false
        });

        const dispatch = useDispatch();
        const { userData } = useSelector((state) => state.auth);
        const { question } = useSelector((state) => state.questions);
        const { answers } = useSelector((state) => state.answers);
        const { id } = useParams();

        const prepareQuestionRatings = () => {
            if (question?.ratings) {
                for (let like of question?.ratings?.likes) {
                    if (userData?.id.toString() === like?.userId.toString()) {
                        setQuestionRating({ liked: true, disliked: false });
                        break;
                    }
                }

                for (let dislike of question?.ratings?.dislikes) {
                    if (userData?.id.toString() === dislike?.userId.toString()) {
                        setQuestionRating({ liked: false, disliked: true });
                        break;
                    }
                }
            }
        };

        useEffect(() => {
            dispatch(getQuestionById(id));
            prepareQuestionRatings();
            dispatch(getAnswersByQuestionId(id));
        }, [id, dispatch, userData?.id, question?.ratings?.likes.length,
            question?.ratings?.dislikes.length]);


        const handleAnswerSubmit = async () => {
            try {
                await dispatch(createAnswer({ id, answer: newAnswer }));
                setFormVisible(!formVisible);
                setNewAnswer("");
            } catch (err) {
                console.log(err);
            }
        };

        const handleAnswerUpdate = async (id) => {
            await dispatch(updateAnswer({ id, answer: editAnswer }))
                .catch((err) => console.log(err));
        };

        const handleAnswerDelete = async (id) => {
            await dispatch(deleteAnswer(id)).catch((err) => console.log(err));
        };

        const handleQuestionLike = async (id) => {
            try {
                if (questionRating.liked) {
                    RatingsApi.deleteQuestionLike(id);
                    setQuestionRating({ liked: false, disliked: false });
                } else if (questionRating.disliked) {
                    RatingsApi.deleteQuestionDislike(id);
                    RatingsApi.createQuestionRating(id, { value: 1 });
                    setQuestionRating({ liked: true, disliked: false });
                } else {
                    RatingsApi.createQuestionRating(id, { value: 1 });
                    setQuestionRating({ liked: true, disliked: false });
                }

                await dispatch(getQuestionById(id));
            } catch (err) {
                console.log(err);
            }
        };

        const handleQuestionDislike = async (id) => {
            try {
                if (questionRating.disliked) {
                    RatingsApi.deleteQuestionDislike(id);
                    setQuestionRating({ liked: false, disliked: false });
                } else if (questionRating.liked) {
                    RatingsApi.deleteQuestionLike(id);
                    RatingsApi.createQuestionRating(id, { value: 0 });
                    setQuestionRating({ liked: false, disliked: true });
                } else {
                    RatingsApi.createQuestionRating(id, { value: 0 });
                    setQuestionRating({ liked: false, disliked: true });
                }

                await dispatch(getQuestionById(id));
            } catch (err) {
                console.log(err);
            }
        };

        return (
            <div className="question-page-wrapper">
                <Question question={question} questionRating={questionRating}
                          handleQuestionLike={handleQuestionLike}
                          handleQuestionDislike={handleQuestionDislike}
                          userId={userData?.id} />
                <div className="question-page-info">
                    <h3>{answers?.length} Answers</h3>
                    <Button onClick={() => setFormVisible(!formVisible)}
                            label="Add Answer" className="submit"
                            disabled={!userData} />
                </div>
                <AnswerForm formVisible={formVisible} answer={newAnswer}
                            setAnswer={setNewAnswer}
                            handleAnswerSubmit={handleAnswerSubmit} />
                {answers?.map((item) => {
                    return <Answer key={item.id} answer={item}
                                   editAnswer={editAnswer}
                                   setEditAnswer={setEditAnswer}
                                   handleAnswerUpdate={handleAnswerUpdate}
                                   handleAnswerDelete={handleAnswerDelete} />;
                })}
            </div>
        );
    }
;

export default QuestionPage;