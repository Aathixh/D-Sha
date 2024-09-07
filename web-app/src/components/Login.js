import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const { username, password } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            localStorage.setItem('token', parseRes.token);
            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1 className='text-center my-5'>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    className='form-control my-3'
                    value={username}
                    onChange={onChange}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    className='form-control my-3'
                    value={password}
                    onChange={onChange}
                />
                <button className='btn btn-success btn-block'>Login</button>
            </form>
            <Link to='/register'>Register</Link>
        </div>
    );
};

export default Login;