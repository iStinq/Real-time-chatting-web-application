import "../Styles/Auth.css";

import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export const Auth = (props) => {
    const {setIsAuth} = props;

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        cookies.set("auth-token", result.user.refreshToken);
        setIsAuth(true);
    }
    
    return (
        <div className="auth">
            <p>Sign in with google to continue</p>
            <button onClick={signInWithGoogle} className="sign-in-with-google-button">Sign in with Google</button>
        </div>
    )
}