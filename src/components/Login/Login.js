import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../StateProviders/StateProvider';
import { actionTypes } from '../../StateProviders/Reducer';

function Login() {

    const [{} , dispatch] = useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider).then(
            result => dispatch({
                type : actionTypes.SET_USER,
                user : result.user
            })
        ).catch(
            err => alert(err.message)
        )
    }

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://i.pinimg.com/originals/99/0b/7d/990b7d2c2904f8cd9bc884d3eed6d003.png" alt="Whatsapp Logo"/>
                <div className="login_text">
                    <h1>Sign in to whatsapp</h1>
                </div>

                <Button type="submit" onClick={signIn} >
                    Sign in with google
                </Button>

            </div>
        </div>
    )
}

export default Login
