import React, { useEffect, useState } from "react";
import Question from "./question/question";
import AnswerForm from "./answerForm/answerForm";
import Button from "../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import Answer from "./answer/answer";
import { useParams } from "react-router";
import { getQuestionById } from "../../redux/questionSlice";
import {
    createAnswer, deleteAnswer, getAnswerById,
    getAnswersByQuestionId,
    updateAnswer
} from "../../redux/answerSlice";
import jwt_decode from "jwt-decode";
import RatingsApi from "../../apis/ratingsApi";

const QuestionPage = () => {
        const [formVisible, setFormVisible] = useState(false);
        const [newAnswer, setNewAnswer] = useState("");
        const [editAnswer, setEditAnswer] = useState("");
        const [questionRating, setQuestionRating] = useState({
            id: null,
            liked: false,
            disliked: false
        });
        const [answerRating, setAnswerRating] = useState({
            id: null,
            liked: false,
            disliked: false
        });

        const dispatch = useDispatch();
        const { userData } = useSelector((state) => state.auth);
        const { question } = useSelector((state) => state.questions);
        const { answers } = useSelector((state) => state.answers);
        const { id } = useParams();
        const decoded = jwt_decode(userData.token);

        useEffect(() => {
            dispatch(getQuestionById(id));

            dispatch(getAnswersByQuestionId(id));
        }, [id, dispatch]);

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

        useEffect(() => {
            if (question?.ratings?.likes) {
                question?.ratings?.likes?.some((like) => {
                    if (like?.userId === decoded?.id)
                        setQuestionRating(
                            { liked: true, disliked: false, id: like?.id });
                });
            }
            if (question?.ratings?.dislikes) {
                question?.ratings?.dislikes?.some((dislike) => {
                    if (dislike?.userId === decoded?.id)
                        setQuestionRating(
                            { liked: false, disliked: true, id: dislike?.id });
                });
            }
        }, [decoded?.id]);

        const handleQuestionRating = async (id, ratingId, value) => {
            try {
                if (questionRating.liked || questionRating.disliked) {
                    await RatingsApi.deleteQuestionRating(ratingId, id);
                    setQuestionRating(
                        { liked: false, disliked: false, id: null });
                }

                if (value === 1 && !questionRating.liked) {
                    const res = await RatingsApi.createQuestionRating(id,
                        { value: value });
                    setQuestionRating({
                        liked: true, disliked: false, id: res.data.id
                    });
                }

                if (value === 0 && !questionRating.disliked) {
                    const res = await RatingsApi.createQuestionRating(id,
                        { value: value });
                    console.log(res.data.id);
                    setQuestionRating(
                        { liked: false, disliked: true, id: res.data.id });
                }

                await dispatch(getQuestionById(id));
            } catch (err) {
                console.log(err);
            }
        };

        const handleAnswerRating = async (id, ratingId, value) => {
            try {
                if (answerRating.liked || answerRating.disliked) {
                    await RatingsApi.deleteAnswerRating(ratingId, id);
                    setAnswerRating(
                        { liked: false, disliked: false, id: null });
                }

                if (value === 1 && !answerRating.liked) {
                    const res = await RatingsApi.createAnswerRating(id,
                        { value: value });
                    setAnswerRating({
                        liked: true, disliked: false, id: res.data.id
                    });
                }

                if (value === 0 && !answerRating.disliked) {
                    const res = await RatingsApi.createAnswerRating(id,
                        { value: value });
                    console.log(res.data.id);
                    setAnswerRating(
                        { liked: false, disliked: true, id: res.data.id });
                }

                await dispatch(getAnswerById(id));
            } catch (err) {
                console.log(err);
            }
        };
        return (
            <div className="question-page-wrapper">
                <Question question={question} questionRating={questionRating}
                          handleQuestionRating={handleQuestionRating}
                          userId={decoded?.id} />
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
                    return <Answer key={item.id} data={item} userId={decoded?.id}
                                   editAnswer={editAnswer}
                                   setEditAnswer={setEditAnswer}
                                   handleAnswerUpdate={handleAnswerUpdate}
                                   handleAnswerDelete={handleAnswerDelete}
                                   handleAnswerRating={handleAnswerRating}
                                   answerRating={answerRating}
                                   setAnswerRating={setAnswerRating} />;
                })}
            </div>
        );
    }
;

export default QuestionPage;