import './App.scss';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {supabase} from './supabase/client.js';
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <div className="App">
            <Router>
                {session
                    ?
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<LogIn/>}/>
                        <Route path="/sign-up" element={<SignUp/>}/>
                    </Routes>
                }
            </Router>
        </div>
    )
}

export default App;