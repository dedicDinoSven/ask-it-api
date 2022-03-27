import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getMostLikedQuestions,
    getQuestions,
    getRecentQuestions
} from "../../redux/questionSlice";
import QuestionsList from "../../components/questionsList/questionsList";
import { FaCalendarAlt, FaFireAlt, FaUsers } from "react-icons/fa";
import { getUsers } from "../../redux/userSlice";
import UsersList from "../../components/usersList/usersList";

const Dashboard = () => {
    const [paginationState, setPaginationState] = useState(
        { page: 1, numberOfRows: 10 });
    const [paginationLoading, setPaginationLoading] = useState(false);

    const dispatch = useDispatch();
    const { questions, recentQuestions, mostLikedQuestions } = useSelector(
        (state) => state.questions);
    const { users } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsers());
        setPaginationLoading(true);
        dispatch(getQuestions());
        dispatch(getRecentQuestions({
            limit: paginationState?.numberOfRows,
            offset: (paginationState?.page - 1) * paginationState?.numberOfRows
        }));
        dispatch(getMostLikedQuestions());
        setPaginationLoading(false);
    }, [dispatch, paginationState?.page, paginationState?.numberOfRows]);

    return (<div className="dashboard-wrapper">
        <section className="dashboard-content-left">
            <div className="dashboard-container">
                <h1 className="dashboard-title">
                    <FaCalendarAlt /> Recent Questions
                </h1>
                <QuestionsList hasPagination={true}
                               paginationState={paginationState}
                               setPaginationState={setPaginationState}
                               loading={paginationLoading}
                               dataCount={questions?.length}
                               data={recentQuestions} />
            </div>
        </section>
        <section className="dashboard-content-right">
            <div className="dashboard-container">
                <h1 className="dashboard-title">
                    <FaFireAlt /> Hot Questions
                </h1>
                <QuestionsList data={mostLikedQuestions} />
            </div>
            <div className="dashboard-container">
                <h1 className="dashboard-title">
                    <FaUsers /> Most Answers By
                </h1>
                <UsersList data={users} />
            </div>
        </section>
    </div>);
};

export default Dashboard;