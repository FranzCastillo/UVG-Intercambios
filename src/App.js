import './App.scss';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {supabase} from './supabase/client.js';
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Home from "./pages/Home/Home";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const {data: authListener} = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_IN') {
                    setIsLoggedIn(true);
                } else if (event === 'SIGNED_OUT') {
                    setIsLoggedIn(false);
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="App">
            <Router>
                {isLoggedIn
                    ?
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/home" element={<Home/>}/>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<LogIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                    </Routes>
                }
            </Router>
        </div>
    )
}

export default App;