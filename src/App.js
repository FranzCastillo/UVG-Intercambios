import './App.scss';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {supabase} from './supabase/client.js';
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import NavBar from "./components/NavBar/NavBar";
import StudentsInExchanges from "./pages/StudentsInExchanges/StudentsInExchanges";
import Students from "./pages/Students/Students/Students";
import Universities from "./pages/Universities/Universities/Universities";
import UniversityDetails from "./pages/Universities/Details/Details";
import NewUniversity from "./pages/Universities/New/NewUniversity";
import Summary from "./pages/Summary/Summary";
import EditUniversity from "./pages/Universities/Edit/Edit";
import NewStudent from "./pages/Students/New/NewStudent";
import StudentDetails from "./pages/Students/Details/StudentDetails";
import EditStudent from "./pages/Students/Edit/EditStudent";

const App = () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <div className="App">
            <Router>
                {session ? (
                    <>
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/estudiantes-de-intercambio" element={<StudentsInExchanges/>}/>
                            {/*STUDENTS*/}
                            <Route path="/estudiantes" element={<Students/>}/>
                            <Route path="/estudiantes/:id" element={<StudentDetails/>}/>
                            <Route path="/estudiantes/new" element={<NewStudent/>}/>
                            <Route path="/estudiantes/edit/:id" element={<EditStudent/>}/>
                            {/*UNIVERSITIES*/}
                            <Route path="/universidades" element={<Universities/>}/>
                            <Route path={"/universidades/new"} element={<NewUniversity/>}/>
                            <Route path={"/universidades/edit/:id"} element={<EditUniversity/>}/>
                            <Route path={"/universidades/:id"} element={<UniversityDetails/>}/>
                            <Route path="/resumen" element={<Summary/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<LogIn/>}/>
                        <Route path="/sign-up" element={<SignUp/>}/>
                    </Routes>
                )}
            </Router>
        </div>
    );
}

export default App;