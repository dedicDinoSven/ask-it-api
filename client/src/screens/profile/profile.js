import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router";
import { getUserById, updatePassword, updateUser } from "../../redux/userSlice";
import {
    FaCheck,
    FaPencilRuler,
    FaQuestion,
    FaTimesCircle,
    FaUserCog
} from "react-icons/fa";
import QuestionsList from "../../components/questionsList/questionsList";
import UpdatePasswordModal from "./updatePasswordModal/updatePasswordModal";
import UpdateDetails from "./updateDetails/updateDetails";
import Validation from "../../utils/validation";
import { toast } from "react-toastify";
import { getQuestions, getRecentQuestions } from "../../redux/questionSlice";

const Profile = () => {
    const [data, setData] = useState({
        firstName: "", lastName: "", email: ""
    });
    const [passwordData, setPasswordData] = useState({
        password: "", password2: ""
    });
    const [toEdit, setToEdit] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [paginationState, setPaginationState] = useState(
        { page: 1, numberOfRows: 10 });
    const [paginationLoading, setPaginationLoading] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.auth);
    const { user, isSuccess, hasError, message } = useSelector(
        (state) => state.users);
    const { questions, recentQuestions } = useSelector(
        (state) => state.questions);
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        if (userData && userData.token) {
            let _decoded = jwt_decode(userData?.token);
            setDecoded(_decoded);
        }
    }, [userData?.id]);

    useEffect(() => {
        dispatch(getUserById(id));
        dispatch(getQuestions({ filters: { userId: id } }));
        setPaginationLoading(true);
        dispatch(getRecentQuestions({
            limit: paginationState?.numberOfRows,
            offset: (paginationState?.page - 1) * paginationState?.numberOfRows,
            filters: { userId: id }
        }));
        setPaginationLoading(false);
    }, [id, dispatch, hasError, isSuccess, message,
        paginationState?.page, paginationState?.numberOfRows]);

    const handleDetailsUpdate = () => {
        if (!Validation.validateEmail(data.email))
            toast.error("Please enter valid email!");
        else {
            dispatch(updateUser({ id, data }));
            setToEdit(false);
        }
    };

    const handlePasswordUpdate = () => {
        if (!Validation.validatePasswordLength(passwordData.password))
            toast.error("Password must be 5 to 100 characters long!");

        else if (passwordData.password !== passwordData.password2)
            toast.error("Passwords do not match!");

        else {
            dispatch(updatePassword({ id, data: passwordData }));
            setModalVisible(false);
        }
    };

    return (<div className="profile-wrapper">
        <section className="profile-content-left">
            <div className="profile-container">
                <h1>Profile <FaUserCog /></h1>
                <section className="profile-details">
                    <div className="icons-wrapper">
                        {decoded?.id === parseInt(id) && (toEdit ?
                            <>
                                <FaCheck className="icon submit"
                                         onClick={handleDetailsUpdate} />
                                <FaTimesCircle className="icon cancel"
                                               onClick={() => setToEdit(
                                                   false)} />
                            </>
                            : <FaPencilRuler className="icon edit"
                                             onClick={() => setToEdit(
                                                 true)} />)}
                    </div>
                    {toEdit ? <UpdateDetails data={data} setData={setData} /> :
                        <>
                            <div className="profile-details-item">
                                <h2>First Name:</h2>
                                <p>{user?.firstName}</p>
                            </div>
                            <div className="profile-details-item">
                                <h2>Last Name:</h2>
                                <p>{user?.lastName}</p>
                            </div>
                            <div className="profile-details-item">
                                <h2>Email:</h2>
                                <p>{user?.email}</p>
                            </div>
                        </>}
                    <div className="border" />
                    <div className="profile-details-item">
                        <h2># of Questions:</h2>
                        <p>{questions?.length}</p>
                    </div>
                    <div className="profile-details-item">
                        <h2># of Answers:</h2>
                        <p>{user?.answersCount}</p>
                    </div>
                    {decoded?.id === parseInt(id) &&
                    <div className="change-password-link"
                         onClick={() => setModalVisible(true)}>
                        Change Password
                    </div>}
                </section>
            </div>
        </section>
        <section className="profile-content-right">
            <div className="profile-container">
                <h1>{decoded?.id === parseInt(id)
                    ? "My"
                    : ""} Questions <FaQuestion /></h1>
                <QuestionsList hasPagination={true}
                               paginationState={paginationState}
                               setPaginationState={setPaginationState}
                               loading={paginationLoading}
                               dataCount={questions?.length}
                               data={recentQuestions} />
            </div>
        </section>
        {modalVisible &&
        <UpdatePasswordModal close={() => setModalVisible(false)}
                             passwordData={passwordData}
                             setPasswordData={setPasswordData}
                             handlePasswordUpdate={handlePasswordUpdate} />}
    </div>);
};

export default Profile;