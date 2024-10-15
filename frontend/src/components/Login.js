import React, { useRef, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState({});
    const username = useRef("");
    const password = useRef("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/auth/login', { username: username.current.value, password: password.current.value }, { withCredentials: true })
        console.log(JSON.stringify(res.data))
        setUser(res.data);
        console.log(JSON.stringify(user));
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
        </div>
    );
}

export default Login;