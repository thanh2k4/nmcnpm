import React, { useRef, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const username = useRef("");
    const password = useRef("");
    const [user, setUser] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/auth/login', { username: username.current.value, password: password.current.value }, { withCredentials: true })
    }
    const handleClick = async (e) => {
        e.preventDefault();
        const res = await axios.get('http://localhost:5000/users/1', { withCredentials: true });
        setUser(res.data);
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>Login</h3>
                <label for="username" >Username</label>
                <input type="text" id="username" ref={username} />
                <br />
                <label for="password" >Password</label>
                <input type="text" id="password" ref={password} />
                <button type="submit">Login</button>
            </form>
            <button type='button' onClick={(e) => handleClick(e)} > Get user </button>
            <div>{JSON.stringify(user)}</div>
        </div>
    );
}

export default Login;