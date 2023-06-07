import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Home from "./pages/Home/Home";

const App = () => {
    return (
        <div className={"app"}>
            <Router>
                <Routes>
                    <Route path="/" element={<SignUp/>}/>
                    <Route path="/signIn" element={<LogIn/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;