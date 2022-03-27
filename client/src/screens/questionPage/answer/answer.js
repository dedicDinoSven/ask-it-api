import React, { useEffect, useState } from "react";
import {
    FaArrowAltCircleDown,
    FaArrowAltCircleUp,
    FaCheck,
    FaEdit,
    FaTimesCircle,
    FaTrash
} from "react-icons/fa";
import DateUtils from "../../../utils/dateUtils";
import InputField from "../../../components/inputField/inputField";
import { useDispatch, useSelector } from "react-redux";
import RatingsApi from "../../../apis/ratingsApi";
import { getAnswersByQuestionId } from "../../../redux/answerSlice";

const Answer = ({
    answer, editAnswer, setEditAnswer, handleAnswerUpdate, handleAnswerDelete
}) => {
    const [toEdit, setToEdit] = useState(false);
    const [answerRating, setAnswerRating] = useState({
        liked: false, disliked: false
    });

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.auth);

    const prepareEdit = (id) => {
        let temp = "";
        if (answer?.id === id) temp = answer?.text;
        setEditAnswer(temp);
        setToEdit(true);
    };

    const prepareAnswerRatings = () => {
        if (answer?.ratings) {
            const likes = answer?.ratings?.likes;
            const dislikes = answer?.ratings?.dislikes;

            likes.length > 0 && likes.map((like) => {
                if (userData?.id === like?.userId)
                    setAnswerRating({ liked: true, disliked: false });
                return true;
            });

            dislikes.length > 0 && dislikes.map((dislike) => {
                if (userData?.id === dislike?.userId)
                    setAnswerRating({ liked: false, disliked: true });
                return true;
            });
        }
    };

    useEffect(() => {
        prepareAnswerRatings();
    });

    const handleAnswerLike = async (id) => {
        try {
            if (answerRating.liked) {
                setAnswerRating({ liked: false, disliked: false });
                await RatingsApi.deleteAnswerLike(id);
            } else if (answerRating.disliked) {
                setAnswerRating({ liked: true, disliked: false });
                await RatingsApi.deleteAnswerDislike(id);
                await RatingsApi.createAnswerRating(id, { value: 1 });
            } else {
                setAnswerRating({ liked: true, disliked: false });
                await RatingsApi.createAnswerRating(id, { value: 1 });
            }
            await dispatch(getAnswersByQuestionId(answer?.questionId));
        } catch (err) {
            console.log(err);
        }
    };

    const handleAnswerDislike = async (id) => {
        try {
            if (answerRating.disliked) {
                setAnswerRating({ liked: false, disliked: false });
                await RatingsApi.deleteAnswerDislike(id);
            } else if (answerRating.liked) {
                setAnswerRating({ liked: false, disliked: true });
                await RatingsApi.deleteAnswerLike(id);
                await RatingsApi.createAnswerRating(id, { value: 0 });
            } else {
                setAnswerRating({ liked: false, disliked: true });
                await RatingsApi.createAnswerRating(id, { value: 0 });
            }
            await dispatch(getAnswersByQuestionId(answer?.questionId));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="answer-wrapper">
            <section className="answer-main">
                <div className="answer-main-left">
                    {!toEdit ?
                        <p>{answer?.text}</p> :
                        <InputField type="textarea" rows="4"
                                    id="text" name="text"
                                    value={editAnswer}
                                    onChange={(e) => setEditAnswer(
                                        e.target.value)}
                                    style={{ width: "100%" }} />
                    }
                    <div className="answer-info">
                        <p><span>Posted</span>
                            {DateUtils.parse(answer?.createdAt)}</p>
                        <p><span>Updated</span>
                            {DateUtils.parse(answer?.updatedAt)}</p>
                    </div>
                </div>
                {userData?.id === parseInt(answer?.user?.id) &&
                <div className="answer-buttons">
                    {toEdit ?
                        <>
                            <FaCheck onClick={() => {
                                handleAnswerUpdate(answer?.id);
                                setToEdit(false);
                            }} />
                            <FaTimesCircle onClick={() => setToEdit(false)} />
                        </> :
                        <>
                            <FaEdit onClick={() => prepareEdit(answer?.id)} />
                            <FaTrash onClick={() => handleAnswerDelete(
                                answer?.id)} />
                        </>}
                </div>}
            </section>
            <section className="answer-details">
                <p><span>Author</span>
                    {(answer?.user?.firstName.length > 0 ||
                        answer?.user?.lastName.length > 0)
                        ?
                        (answer?.user?.firstName + " " + answer?.user?.lastName)
                        :
                        answer?.user?.email}
                </p>
                <div className="answer-ratings">
                    <button className="answer-rating"
                            style={answerRating.liked
                                ? { color: "#4693f3" } : { color: "#000" }}
                            disabled={!userData || userData?.id === answer?.user?.id}
                            onClick={() => handleAnswerLike(answer?.id)}>
                        <FaArrowAltCircleUp />
                        {answer?.ratings?.likes.length ?? 0}
                    </button>
                    <button className="answer-rating"
                            style={answerRating.disliked
                                ? { color: "#e7412c" } : { color: "#000" }}
                            disabled={!userData || userData?.id === answer?.user?.id}
                            onClick={() => handleAnswerDislike(answer?.id)}>
                        <FaArrowAltCircleDown />
                        {answer?.ratings?.dislikes.length ?? 0}
                    </button>
                </div>
            </section>
        </div>);
};

export default Answer;
