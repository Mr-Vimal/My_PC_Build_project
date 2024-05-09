import React, { useState } from "react";
import PC from './1.jpg';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            Password
        }

        // Perform form validation
        if (!FirstName || !LastName || !Email || !PhoneNumber || !Password || !ConfirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (Password !== ConfirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            // Send signup request to the server
            const response = await axios.post('http://localhost:3002/user/create', userData);
            console.log('Response:', response.data);
            alert('Signup successful. Please login to continue.');
            navigate('/login'); // Redirect to the login page after successful signup
        } catch (error) {
            console.error('Error signing up:', error);
            alert('An error occurred while signing up. Please try again later.');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <div className="signup-image">
                    <img src={PC} alt="PC" />
                </div>
                <div className="center">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="loginwith">
                            {/* Google sign-in buttons */}
                        </div>
                        <div className="divider">
                            <span>or</span>
                        </div>
                        <div className="flex-input">
                            <div className="left-input">
                                <div className="txt_field">
                                    <input type="text" value={FirstName} onChange={(e) => setFirstName(e.target.value)} required />
                                    <span className="spanclass"></span>
                                    <label>First Name</label>
                                </div>
                                <div className="txt_field">
                                    <input type="text" value={LastName} onChange={(e) => setLastName(e.target.value)} required />
                                    <span className="spanclass"></span>
                                    <label>Last Name</label>
                                </div>
                                <div className="txt_field">
                                    <input type="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                                    <span className="spanclass"></span>
                                    <label>Email Address</label>
                                </div>
                            </div>
                            <div className="right-input">
                                <div className="txt_field">
                                    <input type="number" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                    <span className="spanclass"></span>
                                    <label>Phone Number</label>
                                </div>
                                <div className="txt_field">
                                    <input type="Password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
                                    <span className="spanclass"></span>
                                    <label>Password</label>
                                </div>
                                <div className="txt_field">
                                    <input type="Password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                    <span className="spanclass"></span>
                                    <label>Confirm Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="signup-btn">
                            <button type="submit" className="signup-btn-no1">Create Account</button>
                        </div>
                    </form>
                    <div className="signup_link">
                        Already Have an Account? <a href="/login">Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
