import React, { useEffect, useState } from "react";
import {
    FaRegQuestionCircle, FaSignInAlt, FaSignOutAlt, FaUser, FaUserPlus,
    FaPlusCircle, FaBars
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../redux/authSlice";

const Navbar = () => {
    const [trigger, setTrigger] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.auth);

    useEffect(() => {
        const changeWidth = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", changeWidth);
        return () => window.removeEventListener("resize", changeWidth);
    }, []);

    return (
        <header className="navbar-wrapper">
            <Link to="/" className="logo">
                Ask.it <FaRegQuestionCircle />
            </Link>
            {(trigger || screenWidth > 640) &&
            <div className="navbar-links-container">
                {userData ?
                    <>
                        <Link to="/create-question" className="navbar-link">
                            <FaPlusCircle /> Ask Question
                        </Link>
                        <Link to={`/user/${userData.id}`}
                              className="navbar-link">
                            <FaUser /> Profile
                        </Link>
                        <Link to="/" className="navbar-link" onClick={() => {
                            dispatch(logout());
                            dispatch(reset());
                        }}>
                            <FaSignOutAlt /> Logout
                        </Link>
                    </> :
                    <>
                        <Link to="/login" className="navbar-link">
                            <FaSignInAlt /> Login
                        </Link>
                        <Link to="/register" className="navbar-link">
                            <FaUserPlus /> Register
                        </Link>
                    </>
                }
            </div>}
            <FaBars className="navbar-hamburger-icon"
                    onClick={() => setTrigger(!trigger)} />
        </header>
    );
};

export default Navbar;