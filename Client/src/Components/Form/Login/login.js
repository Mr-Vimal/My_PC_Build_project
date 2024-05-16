import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Logo from './2.png';
import './login.css';
import { LoginSocialGoogle } from 'reactjs-social-login'
import axios from 'axios';

export default function Login() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const navigate = useNavigate()


    console.log(Email, Password)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email and password are not empty
        if (!Email || !Password) {
            alert('Please enter both email and password.');
            return;
        }

        try {
            // Send login request to the server
            const response = await axios.post('http://localhost:3002/user/login', { Email, Password });
            const { token, role } = response.data;
            console.log('Response Data:', response.data); // Log the response data

            if (token) {
                localStorage.setItem('token', token);
                // Redirect user based on role
                if (role === 'admin') {
                    alert('Admin login successful'); // Add alert for debugging
                    navigate('/admin');
                } else {
                    alert('User login successful'); // Add alert for debugging
                    navigate('/userprofile');
                }
            } else {
                // Display error message to the user
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            // Handle error
            console.error('Error logging in:', error);
            // Display error message to the user
            alert('An error occurred while logging in. Please try again later.');
        }
    };



    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // const handleApi = () => {
    //     axios.post('http://localhost:3001/user/login', { Email: Email, Password: Password })
    //         .then(result => {
    //             console.log(result.data);
    //             alert('Success');
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };



    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-image">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="login-center">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="loginwith">
                            <div className="google__login">
                                <img src="assets/search.png" alt="google" />
                                <span>Sign in with Google</span>
                            </div>
                            <div className="google__login">
                                <LoginSocialGoogle client_id='435896067635-u3kcjnq7ajoj35capkgvh0l1vr74siom.apps.googleusercontent.com' access_type='offline' onResolve={({ provider, data }) => {
                                    console.log(provider, data)
                                }}
                                    onReject={(err) => {
                                        console.log(err)
                                    }}>
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
