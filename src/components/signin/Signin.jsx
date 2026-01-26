import './signin.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Signin({setUser, setError}) {

     const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onEmailChange(event) {
        setEmail(event.target.value);
    };

    function onPasswordChange(event) {
        setPassword(event.target.value);
    };

    const onSignin = async ()=> {
       const response = await fetch('https://dreamviz.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        const signinData = await response.json();

        if(!response.ok) {
            
            setError(signinData.error);
            return;
        }

            localStorage.setItem('token', signinData.token);
            localStorage.setItem('user', JSON.stringify(signinData.user));
            setUser(signinData.user);
            navigate('/home');
        
    }

     const handleSubmit = (e) => {
        e.preventDefault();
        onSignin();
    }

    return (
        <div className="auth-container">
        <div className="auth-box">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit} className="auth-form">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" onChange={onEmailChange} />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" onChange={onPasswordChange} />

        <button type="submit" className="auth-btn">Sign In</button>

        <p className="auth-switch">
            Don't have an account?
            <a href="/register">Create one</a>
        </p>
        </form>
    </div>
    </div>

    )
}

export default Signin;