import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../redux/authSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/button/button";
import Validation from "../../utils/validation";
import { Link } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user: userData, isSuccess, hasError, message } = useSelector(
        (state) => state.auth);

    const onChange = (e) => {
        setData(((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })));
    };

    const handleSubmit = () => {
        if (!Validation.validateEmail(data.email))
            toast.error("Please enter valid email!");

        else if (!Validation.validatePasswordLength(data.password))
            toast.error("Password must be 5 to 100 characters long!");

        else if (data.password !== data.password2)
            toast.error("Passwords do not match!");

        else dispatch(register(data));
    };

    useEffect(() => {
        if (hasError)
            toast.error(message);

        if (isSuccess || userData)
            navigate("/");

        dispatch(reset());

    }, [userData, isSuccess, hasError, message, navigate, dispatch]);

    return (
        <div className="register-wrapper">
            <section className="register-form">
                <InputField label="First Name" type="text" id="firstName"
                            name="firstName" value={data.firstName}
                            onChange={onChange} />
                <InputField label="Last Name" type="text" id="lastName"
                            name="lastName" value={data.lastName}
                            onChange={onChange} />
                <InputField label="Email *" type="email" id="email"
                            name="email" value={data.email}
                            onChange={onChange} />
                <InputField label="Password *" type="password" id="password"
                            name="password" value={data.password}
                            onChange={onChange} />
                <InputField label="Confirm Password *" type="password"
                            id="password2"
                            name="password2" value={data.password2}
                            onChange={onChange} />
                <Button onClick={handleSubmit} className="submit" label="Submit"
                        style={{
                            marginBottom: "16px", width: "100%"
                        }}
                        disabled={!data.email || data.email === "" ||
                        !data.password || data.password === ""
                        || !data.password2 || data.password2 === ""}
                />
            </section>
            <section className="register-heading">
                <div>
                    <h1><FaUserPlus /> Register</h1>
                    <p>Please create an account</p>
                    <div className="register-link">
                        <p>Already have an account?</p>
                        <Link to="/login">Login</Link>
                    </div>
                </div>

            </section>
        </div>);
};

export default Register;