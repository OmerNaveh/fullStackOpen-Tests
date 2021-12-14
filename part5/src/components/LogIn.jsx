import React, { useRef } from 'react'
import notify from '../services/notifiy';
import {login} from '../services/users'
export default function Login(props){
    const userName = useRef(null);
    const password = useRef(null);
    const loginFunc= async()=>{
        try {        
            props.setName(userName.current.value)
            window.localStorage.setItem('user', userName.current.value)
            await login(userName.current.value, password.current.value);
            props.setCookie(document.cookie)
            window.localStorage.setItem('cookie', document.cookie)
            notify('logged In')
        } catch (error) {
            notify('Unable to login')
        }
    }
    return(
        <div>
            <h1 id='pageTitle'>Log In To Application</h1>
            <p>UserName
            <input ref={userName}></input>
            </p>
            <p>Password
            <input ref={password}></input>
            </p>
            <button onClick={()=>loginFunc()}>LogIn</button>
        </div>
    )
}