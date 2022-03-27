import React from "react";
import { useNavigate } from "react-router";

const UsersList = (props) => {
    const navigate = useNavigate();

    return (
        <div className="users-list-wrapper">
            <div className="users-list-row">
                <div className="users-list-row-left">
                    <h1>#</h1>
                    <h2>User</h2>
                </div>
                <h3># of Answers</h3>
            </div>
            {props?.data?.map((item, index) => {
                return (
                    <div className="users-list-row" key={index}
                         onClick={() => navigate(`/user/${item?.id}`)}>
                        <div className="users-list-row-left">
                            <h1>{`${index + 1}.`}</h1>
                            <p>{(item?.firstName.length > 0 ||
                                item?.lastName.length > 0) ?
                                (item?.firstName + " " +
                                    item?.lastName) :
                                item?.email}</p>
                        </div>
                        <h3>{item?.answersCount}</h3>
                    </div>
                );
            })}
        </div>);
};

export default UsersList;