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
import { getAnswerById } from "../../../redux/answerSlice";

const Answer = ({
    data, userId, editAnswer, setEditAnswer, handleAnswerUpdate,
    handleAnswerDelete, handleAnswerRating, answerRating, setAnswerRating
}) => {
    const [toEdit, setToEdit] = useState(false);
    const dispatch = useDispatch();
    const { answer } = useSelector((state) => state.answers);

    const prepareEdit = (id) => {
        let temp = "";
        if (data?.id === id) temp = data?.text;
        setEditAnswer(temp);
        setToEdit(true);
    };

    useEffect(() => {
        if (answer?.ratings?.likes) {
            answer?.ratings?.likes?.some((like) => {
                if (like?.userId == userId)
                    setAnswerRating(
                        { liked: true, disliked: false, id: like?.id });
            });
        }
        if (answer?.ratings?.dislikes) {
            answer?.ratings?.dislikes?.some((dislike) => {
                if (dislike?.userId == userId)
                    setAnswerRating(
                        { liked: false, disliked: true, id: dislike?.id });
            });
        }
    }, [userId, answer?.ratings?.likes.length,
        answer?.ratings?.dislikes?.length]);
    return (
        <div className="answer-wrapper">
            <section className="answer-main">
                <div className="answer-main-left">
                    {!toEdit ?
                        <p>{data?.text}</p> :
                        <InputField type="textarea" rows="4"
                                    id="text" name="text"
                                    value={editAnswer}
                                    onChange={(e) => setEditAnswer(
                                        e.target.value)}
                                    style={{ width: "100%" }} />
                    }
                    <div className="answer-info">
                        <p><span>Posted</span>
                            {DateUtils.parse(data?.createdAt)}
                        </p>
                        <p><span>Updated</span>
                            {DateUtils.parse(data?.updatedAt)}
                        </p>
                    </div>
                </div>
                {userId === parseInt(data?.user?.id) &&
                <div className="answer-buttons">
                    {toEdit ?
                        <>
                            <FaCheck onClick={() => {
                                handleAnswerUpdate(data?.id);
                                setToEdit(false);
                            }} />
                            <FaTimesCircle onClick={() => setToEdit(false)} />
                        </> :
                        <>
                            <FaEdit onClick={() => prepareEdit(data?.id)} />
                            <FaTrash
                                onClick={() => handleAnswerDelete(data?.id)} />
                        </>}
                </div>}
            </section>
            <section className="answer-details">
                <p><span>Author</span>
                    {(data?.user?.firstName.length > 0 ||
                        data?.user?.lastName.length > 0) ?
                        (data?.user?.firstName + " " + data?.user?.lastName) :
                        data?.user?.email}
                </p>
                <div className="answer-ratings"
                     onMouseEnter={() => dispatch(getAnswerById(data?.id))}>
                    <button className="answer-rating"
                            disabled={userId && userId === data?.user?.id}
                            onClick={() => handleAnswerRating(data?.id,
                                answerRating?.id, 1)}>
                        <FaArrowAltCircleUp /> {data?.ratings?.likes.length ??
                    0}
                    </button>
                    <button className="answer-rating"
                            disabled={userId && userId === data?.user?.id}
                            onClick={() => handleAnswerRating(data?.id,
                                answerRating?.id, 0)}>
                        <FaArrowAltCircleDown /> {data?.ratings?.dislikes.length ??
                    0}
                    </button>
                </div>
            </section>
        </div>);
};

export default Answer;
