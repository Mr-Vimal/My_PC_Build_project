import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './2.png';
import './login.css';
import { LoginSocialGoogle } from 'reactjs-social-login';

export default function Login() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Email || !Password) {
            alert('Please enter both email and password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3002/user/login', { Email, Password });
            const { token, role, profileImage } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('profileImage', profileImage);

                if (role === 'admin') {
                    alert('Admin login successful');
                    navigate('/admin');
                } else {
                    alert('User login successful');
                    navigate('/');
                }
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in. Please try again later.');
        }
    };

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-image">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="login-center">
                    <h1>Login with TECH SPACE</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="loginwith">
                            <div className="google__login">
                                <LoginSocialGoogle
                                    client_id='your-google-client-id'
                                    access_type='offline'
                                    onResolve={({ provider, data }) => console.log(provider, data)}
                                    onReject={(err) => console.log(err)}
                                >
                                    <span>Sign in with Google</span>
                                </LoginSocialGoogle>
                                <img src="assets/search.png" alt="google" />
                            </div>
                        </div>
                        <div className="divider">
                            <span>or</span>
                        </div>
                        <div className="login-input">
                            <div className="login-txt_field">
                                <input type="email" value={Email} onChange={handleEmail} required />
                                <span className="spanclass"></span>
                                <label htmlFor="email">Email Address</label>
                            </div>
                            <div className="login-txt_field">
                                <input type="password" value={Password} onChange={handlePassword} required />
                                <span className="spanclass"></span>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="login-btn">
                            <button type="submit" className="login-btn-no1">Login</button>
                        </div>
                    </form>
                    <div className="forgot">Forgot Password?</div>
                    <div className="signup_link">
                        Not a Member? <a href="/signup">Create New Account</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
