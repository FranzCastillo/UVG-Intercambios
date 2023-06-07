import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";

const App = () => {
    return (
        <div className={"app"}>
            <Router>
                <Routes>
                    <Route path="/" element={<SignUp/>}/>
                    <Route path="/signIn" element={<LogIn/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;