import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./screens/dashboard/dashboard";
import Login from "./screens/login/login";
import Register from "./screens/register/register";
import Navbar from "./components/navbar/navbar";
import Profile from "./screens/profile/profile";
import CreateQuestion from "./screens/createQuestion/createQuestion";
import QuestionPage from "./screens/questionPage/questionPage";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <div className="app-wrapper">
                    <Navbar />
                    <Routes>
                        <Route exact path="/" element={<Dashboard />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/user/:id" element={<Profile />} />
                        <Route exact path="/create-question"
                               element={<CreateQuestion />} />
                        <Route exact path="/question/:id"
                               element={<QuestionPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
            <ToastContainer position="bottom-center" theme="colored"
                            autoClose={3500} closeOnClick draggable
                            pauseOnFocusLoss pauseOnHover />
        </>);
};

export default App;
