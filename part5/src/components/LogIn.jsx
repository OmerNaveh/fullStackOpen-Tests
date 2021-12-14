import React, { useRef } from 'react'
import {login} from '../services/users'
export default function Login(props){
    const userName = useRef(null);
    const password = useRef(null);
    const loginFunc= async()=>{
        try {        
            await login(userName.current.value, password.current.value);
            props.setCookie(document.cookie)
            console.log(document.cookie);
            window.localStorage.setItem('cookie', document.cookie)
            props.setName(userName.current.value)
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div>
            <h1>Log In To Application</h1>
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