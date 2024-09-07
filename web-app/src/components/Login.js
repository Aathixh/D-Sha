import React from 'react';

const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [email,password] = inputs;
    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" name="username" placeholder="Username" className='form-control my-3' value="username"onChange={onChange}/>
                <input type="password" name="password" placeholder="Password" className='form-control my-3' value='password'onChange={onChange}/>
                <button onClick={() => setAuth(true)} className='btn btn-success btn-block' onChange={onChange}>Login</button>
            </form>
        </div>
    )
}
export default Login;