import {supabase} from "../../supabase/client";
import {useNavigate} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";


const Home = () => {
    const navigate = useNavigate();

    async function signOut() {
        try {
            await supabase.auth.signOut().then(
                navigate("/")
            );
        } catch (error) {
            console.log('Error signing out:', error.message);
        }
    }


    return (
        <div>
            <NavBar/>
            <h1>Home</h1>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
}

export default Home;