import React from "react";
import PaginationToolbar from "../paginationToolbar/paginationToolbar";
import DateUtils from "../../utils/dateUtils";
import { useNavigate } from "react-router";

const QuestionsList = (props) => {
    const navigate = useNavigate();

    return (
        <div className="questions-list-wrapper">
            <div className="questions-list">
                {props?.data?.map((item) => {
                    return (
                        <div className="questions-list-item" key={item?.id}>
                            <div className="questions-list-item-main">
                                <h2 onClick={() => navigate(
                                    `/question/${item?.id}`)}>{item?.title}</h2>
                                <p className="questions-list-item-text">
                                    {item?.text.length > 82
                                        ? `${item?.text.slice(0, 82)}...`
                                        : item?.text}
                                </p>
                                <p className="questions-list-item-author"
                                   onClick={() => navigate(
                                       `/user/${item?.user?.id}`)}>
                                    <span>Posted by </span>
                                    {(item?.user?.firstName.length > 0 ||
                                        item?.user?.lastName.length > 0) ?
                                        (item?.user?.firstName + " " +
                                            item?.user?.lastName) :
                                        item?.user?.email}
                                    <span> on </span>
                                    {DateUtils.parse(item?.createdAt)}
                                </p>
                            </div>
                            {item?.likesCount &&
                            <div className="questions-list-item-stats">
                                Likes:{" "}
                                <span>{item?.likesCount}</span>
                            </div>}
                        </div>
                    );
                })}
            </div>
            {props?.hasPagination &&
            <PaginationToolbar numberOfRowsInDropdown={[5, 10, 15, 20]}
                               dataCount={props?.dataCount}
                               loading={props?.loading}
                               state={props?.paginationState}
                               setState={props?.setPaginationState}
            />}
        </div>);
};

export default QuestionsList;
