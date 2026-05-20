import './register.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Register({setUser, setError, setIsLoading}) {

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function onEmailChange(event) {
        setEmail(event.target.value);
    };

    function onPasswordChange(event) {
        setPassword(event.target.value);
    };

    function onNameChange(event) {
        setName(event.target.value);
    };

    const onRegister = async () => {
        setError(null);
        setIsLoading(true);

    try {
        const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            email,
            password
        })
        });

        const registerData = await response.json();

        if (!response.ok) {
        setError(registerData.error);
        setIsLoading(false);
        return;
        }

        localStorage.setItem('token', registerData.token);
        localStorage.setItem('user', JSON.stringify(registerData.user));

        setUser(registerData.user);
        navigate('/home');
        setIsLoading(false);

    } catch (err) {
        setError('Network error. Please try again.');
    }
    };

const handleSubmit = (e) => {
    e.preventDefault();

    // if (!email || !password || !name) {
    //     setError('Fill in all the registration fields');
    //     return;
    // }

    onRegister();
};


    return (
        <div className="auth-container">
        <div className="auth-box">
        <h2>Register</h2>

        <form onSubmit={handleSubmit} className="auth-form">

        <label>Name</label>
        <input type="name" placeholder="Enter your name" onChange={onNameChange} />

        <label>Email</label>
        <input type="email" placeholder="Enter your email" onChange={onEmailChange} />

        <label>Create Password</label>
        <input type="password" placeholder="Enter your password" onChange={onPasswordChange} />
        
        <label>Reenter Password</label>
        <input type="password" placeholder="Enter your password" onChange={onPasswordChange} />

        <button type="submit" className="auth-btn">Register</button>

        <p className="auth-switch">Already have an account?
            <Link to="/signin">Sign in</Link>
        </p>
        <p className="auth-switch">Main page <Link to="/">Go back</Link></p>
        </form>
    </div>
    </div>

    )
}

export default Register;