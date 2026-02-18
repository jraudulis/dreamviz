import './signin.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

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
            setIsLoading(false);
        
    }

     const handleSubmit = (e) => {
        e.preventDefault();
        onSignin();
    }

    return (
        <div className="signin-page">
            
            <div className="signin-container">
                {/* Hero Section */}
                <div className="hero-section">
                    
                    <h2 className="hero-title">
                        Turn your dreams into
                        <span className="gradient-text"> stunning visuals</span>
                    </h2>
                    
                    <p className="hero-description">
                        Powered by advanced AI, DreamViz transforms your dream descriptions 
                        into beautiful, unique artwork. Your imagination is the only limit.
                    </p>

                    <div className="feature-grid">
                        <div className="feature-card">
                            <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div className="feature-text">
                                <h3>AI-Powered Generation</h3>
                                <p>Advanced neural networks transform your descriptions into unique artwork</p>
                            </div>
                        </div>
                        
                        <div className="feature-card">
                            <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <div className="feature-text">
                                <h3>Instant Results</h3>
                                <p>High-quality images generated in seconds, not hours</p>
                            </div>
                        </div>
                        
                        <div className="feature-card">
                            <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M3 9H21" stroke="currentColor" strokeWidth="2"/>
                                <path d="M9 21V9" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <div className="feature-text">
                                <h3>Personal Gallery</h3>
                                <p>Organize and revisit your entire dream visualization library</p>
                            </div>
                        </div>
                    </div>
                </div>

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
                            <p>Don't have an account? <a href="/register">Sign up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;