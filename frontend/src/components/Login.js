import React, { useRef, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const { user, setUser } = useState({});
    const username = useRef("");
    const password = useRef("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/auth/login', { username: username.current.value, password: password.current.value }, { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>Login</h3>
                <label for="username" >Username</label>
                <input type="text" id="username" ref={username} />
                <br />
                <label for="password" >Password</label>
                <input type="password" id="password" ref={password} />
                <button type="submit">Login</button>
            </form>
            <div>
                {JSON.stringify(user)}
            </div>
        </div>
    );
}

export default Login;