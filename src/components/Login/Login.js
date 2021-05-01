import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext}  from '../../App';
import { useHistory, useLocation } from 'react-router';

if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(res => {
                const {displayName,email, photoURL} = res.user;

                const signedInUser = {
                    name: displayName,
                    email,
                    photoURL
                }
                console.log(signedInUser);
                setLoggedInUser(signedInUser);
                console.log(loggedInUser);
                history.replace(from);
        }).catch(err => {

        })
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
    );
};

export default Login;