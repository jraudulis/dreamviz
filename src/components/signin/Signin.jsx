import './signin.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Signin({setUser, setError, setIsLoading}) {

    const API_URL = import.meta.env.VITE_API_URL;
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
        setIsLoading(true);

    try{

        const response = await fetch(`${API_URL}/signin`, {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })

        const signinData = await response.json();

            if(!response.ok) {
            setIsLoading(false);
            setError(signinData.error);
            return;
        }

            localStorage.setItem('token', signinData.token);
            localStorage.setItem('user', JSON.stringify(signinData.user));
            setUser(signinData.user);
            navigate('/home');
        
        }catch(err){
            setError('Server error - Please try later');
        } finally {
            setIsLoading(false);
        }

    }

     const handleSubmit = (e) => {
        e.preventDefault();
        onSignin();
    }

    return (
        <div className="signin-page">

                {/* Auth Card */}
                <div className="auth-section">
                    <div className="auth-card">
                        <div className="auth-header">
                            <h2>Welcome back</h2>
                            <p>Sign in to continue your journey</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    id="email"
                                    type="email" 
                                    placeholder="you@example.com" 
                                    onChange={onEmailChange}
                                    value={email}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    id="password"
                                    type="password" 
                                    placeholder="Enter your password" 
                                    onChange={onPasswordChange}
                                    value={password}
                                    required 
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                <span>Sign In</span>
                                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                            <p>Main page <Link to="/">Go back</Link></p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Signin;