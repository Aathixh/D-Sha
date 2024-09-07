import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    role: ''
  });

  const { username, password, role } = inputs;

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password, role };
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();
      console.log(parseRes);
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
      toast.success("Registered Successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
    <h1 className='text-center my-5'>Register</h1>
    <form onSubmit={onSubmitForm}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        placeholder="Username"
        className='form-control my-3'
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        className='form-control my-3'
      />
      <input
        type="text"
        name="role"
        value={role}
        onChange={onChange}
        placeholder="Role"
        className='form-control my-3'
      />
      <button type="submit" className='btn btn-block btn-success'>Register</button>
    </form>
    <Link to="/login">Login</Link>
    </>
  );
};

export default Register;