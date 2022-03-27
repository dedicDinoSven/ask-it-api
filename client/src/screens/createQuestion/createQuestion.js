import React, { useState } from "react";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/button/button";
import { useNavigate } from "react-router";
import { createQuestion } from "../../redux/questionSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const CreateQuestion = () => {
    const [data, setData] = useState({
        title: "", text: "", userId: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            const res = await dispatch(createQuestion(data));
            const question = unwrapResult(res);
            navigate(`/question/${question?.id}`);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="create-question-wrapper">
            <h1>Ask a Question</h1>
            <section className="create-question-fields">
                <InputField label="Title *" type="text" id="title"
                            name="title" value={data.title}
                            onChange={(e) => setData(
                                { ...data, title: e.target.value })}
                            autoFocus style={{ width: "100%" }} />
                <InputField label="Question Details *" type="textarea" rows="8"
                            id="text" name="text" value={data.text}
                            onChange={(e) => setData(
                                { ...data, text: e.target.value })}
                            style={{ width: "100%" }} />
                <Button onClick={handleSubmit} label="Submit" className="submit"
                        style={{ width: "100%" }}
                        disabled={!data.title || data.title === "" ||
                        !data.text || data.text === ""} />
            </section>
        </div>
    );
};

export default CreateQuestion;